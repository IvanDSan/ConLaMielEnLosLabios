import { z } from 'zod';

const userSchema = z
  .object({
    email: z.string().email('El email no es válido').min(1),
    password: z
      .string()
      .min(8, 'La password debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
        'La password debe tener al menos una mayúscula, una minúscula, un número y un caracter especial'
      ),
    confirmPassword: z.string(),
    imagen: z.union([z.instanceof(File), z.null()]).optional(),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastname: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    dni: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\d{9,15}$/, 'El teléfono debe tener entre 9 y 15 dígitos'),
    city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
    province: z
      .string()
      .min(2, 'La provincia debe tener al menos 2 caracteres'),
    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
    zipcode: z
      .string()
      .min(5, 'El código postal debe tener al menos 5 dígitos'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const validateUser = (body) => {
  const result = userSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message);
    return { error: errors };
  }

  return { success: true, data: result.data };
};

export default userSchema;
