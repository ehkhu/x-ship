'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { toast } from 'sonner';

const FormSchema = z.object({
  username: z.string({
    message: 'Enter User Name',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const imageStyle = {
  borderRadius: '50%',
  border: '1px solid #fff',
};

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: 'ehkhu',
      password: 'Password',
    },
  });

  const onSubmit = async (data: FormData) => {
    const { username, password } = data;

    try {
      const response: any = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/');
        router.refresh();
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Process response here
      if (response.error) {
        toast.error('Login Failed');
      } else {
        toast.success('welcome back!');
      }
    } catch (error: any) {
      toast.error('Login failed!');
      console.error('Login Failed:', error);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <Image
          style={imageStyle}
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/kdhw_logo.png"
          alt="KDHW Logo"
          width={90}
          height={30}
          priority
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[300px] max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Login</CardTitle>
              {/* <CardDescription>
                Enter your User Name below to login to your account.
              </CardDescription> */}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="username"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="passwrod"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'loading....' : 'Sign In'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
