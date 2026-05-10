'use server';

export async function verifyAdminPin(pin: string) {
  const correctPin = process.env.ADMIN_PIN;
  
  if (!correctPin) {
    console.error("ADMIN_PIN is not set in environment variables.");
    return false;
  }

  return pin === correctPin;
}