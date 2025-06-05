'use client'

import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { toast } from "sonner"

const emailFormSchema = z.object({
  email: z.string().email('Email is invalid'),
})

const otpFormSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits.').regex(new RegExp(REGEXP_ONLY_DIGITS), 'OTP must contain only digits.'),
})

const newPasswordFormSchema = z.object({
  password: z.string().min(12, 'Password must be between 12 and 64 characters long.').max(64, 'Password must be between 12 and 64 characters long.'),
})


export function PasswordResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [verificationCodeDialogOpen, setVerificationCodeDialogOpen] = useState(false)
    const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false)
    const router = useRouter();  

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const newPasswordForm = useForm<z.infer<typeof newPasswordFormSchema>>({
    resolver: zodResolver(newPasswordFormSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'all',
  });

  const handlVerificationCodeDialogOpenChange = (open: boolean) => {
    otpForm.reset();
    setVerificationCodeDialogOpen(open);
  };

  function handleNewPasswordDialogOpenChange(open: boolean) {
    newPasswordForm.reset()
    otpForm.reset();
    setNewPasswordDialogOpen(open);
  }

  function onEmailSubmit() {
    setVerificationCodeDialogOpen(true);
  }

  function onVerificationCodeSubmit() {
    setVerificationCodeDialogOpen(false);
    setNewPasswordDialogOpen(true);
    
  }

  function onNewPasswordSubmit() {
    setNewPasswordDialogOpen(false);
    emailForm.reset()
    newPasswordForm.reset()
    otpForm.reset();
    toast.success('Password reset successfully. You can now login with your new password.');
    router.push('/login');
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your email below associated with your account to send password reset code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      < Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <Button type="submit" className="w-full cursor-pointer">
                Send Reset Code
              </Button>
            </form>
          </Form>
          <Dialog open={verificationCodeDialogOpen} onOpenChange={handlVerificationCodeDialogOpenChange}>
            <DialogContent className="w-[380px] max-w-full h-[260px] max-h-[90vh]">
              <div className='flex flex-col items-center justify-center text-center gap-4'>
                <DialogHeader>
                  <DialogTitle>
                    Reset password code
                  </DialogTitle>
                  <DialogDescription>
                    Enter the code sent to your email
                  </DialogDescription>
                </DialogHeader>
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onVerificationCodeSubmit)} className="space-y-6">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP maxLength={6}  {...field} pattern={REGEXP_ONLY_DIGITS} >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Enter the 6-digit code sent to your email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter >
                      <Button type="submit" className="cursor-pointer">
                        Next
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={newPasswordDialogOpen} onOpenChange={handleNewPasswordDialogOpenChange} >
            <DialogContent className="w-[380px] max-w-full h-[260px] max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>
                  New password
                </DialogTitle>
                <DialogDescription>
                    Choose a new password
                  </DialogDescription>
              </DialogHeader>
              <Form {...newPasswordForm}>
                <form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={newPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          < Input {...field}/>
                        </FormControl>
                        <FormDescription>
                          This is your new password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full cursor-pointer">
                    Confirm
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
