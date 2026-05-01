import { pgTable, serial, text, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export const intakeSubmissionsTable = pgTable("intake_submissions", {
  id: serial("id").primaryKey(),
  firmName: text("firm_name").notNull(),
  billingStreet: text("billing_street").notNull(),
  billingCity: text("billing_city").notNull(),
  billingState: text("billing_state").notNull(),
  billingZip: text("billing_zip").notNull(),
  billingCountry: text("billing_country").notNull(),
  primaryContactName: text("primary_contact_name").notNull(),
  primaryContactTitle: text("primary_contact_title").notNull(),
  primaryContactEmail: text("primary_contact_email").notNull(),
  primaryContactPhone: text("primary_contact_phone").notNull(),
  billingContactName: text("billing_contact_name"),
  billingContactEmail: text("billing_contact_email"),
  authorizedUsers: jsonb("authorized_users").notNull().$type<Array<{ name: string; email: string }>>(),
  licenseCount: integer("license_count").notNull(),
  contractLength: text("contract_length").notNull(),
  ein: text("ein"),
  referralSource: text("referral_source"),
  notes: text("notes"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripePriceId: text("stripe_price_id"),
  status: text("status").notNull().default("pending"),
  emailsSentAt: timestamp("emails_sent_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type IntakeSubmission = typeof intakeSubmissionsTable.$inferSelect;
export type InsertIntakeSubmission = typeof intakeSubmissionsTable.$inferInsert;
