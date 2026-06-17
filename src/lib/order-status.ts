// Order status values, kept in their own dependency-free module so client
// components can import them without pulling in the MongoDB-backed data layer.

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

// Stock is deducted from inventory when an order reaches this status, and added
// back if the order is later cancelled.
export const STOCK_DEDUCT_STATUS: OrderStatus = "delivered";
