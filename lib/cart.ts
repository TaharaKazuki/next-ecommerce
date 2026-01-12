"use server";

import { Prisma } from "@prisma/client";
import { cacheTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "./prisma";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

// React cacheを使用（リクエストスコープのキャッシュ）
const getCartById = async (id: string) => {
  "use cache";
  cacheTag(`getCartBy_${id}`);
  return await prisma.cart.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

async function findCartFromCookie(): Promise<CartWithProducts | null> {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) return null;

  return await getCartById(cartId);
}

export async function getCart(): Promise<ShoppingCart | null> {
  const cart = await findCartFromCookie();

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.length,
    subtotal: cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
  };
}

async function getOrCreateCart(): Promise<CartWithProducts> {
  let cart = await findCartFromCookie();
  if (cart) return cart;

  cart = await prisma.cart.create({
    data: {},
    include: { items: { include: { product: true } } },
  });

  (await cookies()).set("cartId", cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return cart;
}

export async function addCart(productId: string, quantity: number = 1) {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const cart = await getOrCreateCart();
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  updateTag(`getCartBy_${cart.id}`);
}
