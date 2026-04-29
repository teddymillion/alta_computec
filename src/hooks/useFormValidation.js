const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE  = /^[+\d\s\-().]{7,20}$/;

export function validateFields(fields) {
  const errors = {};

  if ('firstName' in fields && !fields.firstName?.trim())
    errors.firstName = 'First name is required';

  if ('lastName' in fields && !fields.lastName?.trim())
    errors.lastName = 'Last name is required';

  if ('fullName' in fields && !fields.fullName?.trim())
    errors.fullName = 'Full name is required';

  if ('email' in fields) {
    if (!fields.email?.trim()) errors.email = 'Email is required';
    else if (!EMAIL_RE.test(fields.email.trim())) errors.email = 'Enter a valid email address';
  }

  if ('phone' in fields && fields.phone?.trim() && !PHONE_RE.test(fields.phone.trim()))
    errors.phone = 'Enter a valid phone number';

  if ('organisation' in fields && !fields.organisation?.trim())
    errors.organisation = 'Organisation is required';

  if ('company' in fields && !fields.company?.trim())
    errors.company = 'Organisation is required';

  if ('cvFile' in fields && !fields.cvFile)
    errors.cvFile = 'Please attach your CV';

  return errors;
}

export function errCls(err) {
  return err ? ' !border-red-400 focus:!ring-red-400/30' : '';
}
