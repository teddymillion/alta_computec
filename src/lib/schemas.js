import { z } from 'zod';

const str = (max = 500) => z.string().trim().max(max).optional().or(z.literal(''));

export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(500),
  lastName: z.string().trim().min(1).max(500),
  email: z.string().email(),
  organisation: str(),
  jobTitle: str(),
  industry: str(),
  sector: str(),
  solutionInterest: str(),
  message: str(5000),
  hearAboutUs: str(),
});

export const quoteSchema = z.object({
  subcategory: z.string().trim().min(1).max(500),
  firstName: z.string().trim().min(1).max(500),
  lastName: z.string().trim().min(1).max(500),
  email: z.string().email(),
  phone: str(),
  specs: z.record(z.unknown()),
});

export const rfqSchema = z.object({
  fullName: z.string().trim().min(1).max(500),
  organisation: z.string().trim().min(1).max(500),
  email: z.string().email(),
  phone: str(),
  productCategory: str(),
  productsOfInterest: str(5000),
  quantityEstimate: str(),
  additionalNotes: str(5000),
});

export const applySchema = z.object({
  jobTitle: z.string().trim().min(1).max(500),
  department: str(),
  fullName: z.string().trim().min(1).max(500),
  email: z.string().email(),
  coverNote: str(5000),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
