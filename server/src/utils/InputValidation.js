const { z } = require('zod')
export const usernameValidation = z
    .string({ required_error: "Username is required !" })
    .trim()
    .min(2, { message: "Username must be at list 2 characters !" })
    .max(255, { message: "Username must not more than 255 characters !" })
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character !")
export const nameValidation = z
    .string({ required_error: "Name is required !" })
    .trim()
    .min(2, { message: "Name must be at list 2 characters !" })
    .max(255, { message: "Username must not more than 255 characters !" })

export const emailValidation = z
    .string({ required_error: "Email is required !" })
    .email({ message: "Invalid email address" })

export const passwordValidation = z
    .string()
    .min(2, { message: "Password must be at list 6 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/, "Minimum 10 characters, at least one letter and one number")
export const phoneValidation = z
    .string({ required_error: "Phone number is required !" })
    .trim()
    .min(10, { message: "Phone must be at list 10 characters !" })
    .max(20, { message: "phone must not more than 20 characters !" })