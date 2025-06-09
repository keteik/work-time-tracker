'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '../lib/utils';
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { InputEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const employeeLoginFormSchema = z.object({
  employeeId: z.string().min(1, 'Your ID is required').max(10).regex(/^\d+$/, 'Employee ID must be numeric'),
})


export function UserLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const employeeLoginForm = useForm<z.infer<typeof employeeLoginFormSchema>>({
      resolver: zodResolver(employeeLoginFormSchema),
      mode: 'onChange',
      defaultValues: {
        employeeId: '',
      },
    });

  function handleEmployeeLogin() {
    router.push('/employee');

  }

   const handleBeforeEmployeeIDInput = (e: InputEvent<HTMLInputElement>) => {
    const input = e.data;
    if (input && /\D/.test(input)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className={cn("flex h-screen flex-col mt-40", className)} {...props}>
      <div className='flex justify-center mb-4 text-2xl font-bold'>
        {dayjs(date).format('HH:mm:ss')}
      </div>
      <h1 className="text-3xl font-bold mb-4">Login as employee</h1>
      <Form {...employeeLoginForm}>
        <form onSubmit={employeeLoginForm.handleSubmit(handleEmployeeLogin)} className="space-y-4">
          <FormField
          control={employeeLoginForm.control}
          name='employeeId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                < Input {...field} placeholder="1234" maxLength={10} onBeforeInput={handleBeforeEmployeeIDInput}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          >
          </FormField>
          <Button type="submit" className="w-full cursor-pointer">
              Login
          </Button>
        </form>
      </Form>
    </div>
  );
}