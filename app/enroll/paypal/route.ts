import { NextResponse, type NextRequest } from "next/server";
import { captureOrder } from "@/lib/paypal";
import { grantAccess } from "@/lib/course-access";
import { coursePrice } from "@/lib/pricing";

// PayPal sends the buyer back here (?token=ORDER_ID) after they approve the payment.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const done = (status: string) => NextResponse.redirect(new URL(`/enroll/success?provider=paypal&status=${status}`, url.origin));
  const orderId = url.searchParams.get("token") || "";
  if (!/^[A-Z0-9]{8,40}$/.test(orderId)) return done("unknown");

  const order = await captureOrder(orderId).catch(() => null);
  const unit = order?.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  const expected = { value: (coursePrice.amount / 100).toFixed(2), currency: coursePrice.currency.toUpperCase() };
  const amountOk = capture?.amount.value === expected.value && capture?.amount.currency_code === expected.currency;

  if (order?.status === "COMPLETED" && capture?.status === "COMPLETED" && amountOk && unit?.custom_id) {
    const granted = await grantAccess(unit.custom_id, "paypal", order.id);
    return done(granted ? "paid" : "unknown");
  }
  if (capture?.status === "PENDING") return done("pending");
  return done("unknown");
}
