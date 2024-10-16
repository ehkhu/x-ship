'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { auth } from '@/auth';

const FormSchema = z.object({
  username: z.string({
    message: 'Enter User Name',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type FormData = z.infer<typeof FormSchema>;
export default function LoginMultiStepComponent({ projects, donors }: any) {
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
        // router.push('/');
        handleNext();
        // router.refresh();
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
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDonor, setSelectedDonor] = useState('');

  const handleNext = async () => {
    if (step === 2) {
      // // Make an API call to set project and donor
      if (typeof window !== 'undefined') {
        localStorage.setItem('project', selectedProject);
        localStorage.setItem('donor', selectedDonor);
      }
    }
    if (step === 3) {
      router.push('/dashboard');
      router.refresh();
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-[300px] max-w-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Login</CardTitle>
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
                              // className="text-black"
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
                              // className="text-black"
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
        );
      case 2:
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Choose Project and Donner</CardTitle>
              <CardDescription>
                Select the project and donner you want to work on.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              <Select onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project: any) => (
                    <SelectItem key={project.value} value={project.value}>
                      {project.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectedDonor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a donor" />
                </SelectTrigger>
                <SelectContent>
                  {donors.map((donor: any) => (
                    <SelectItem key={donor.value} value={donor.value}>
                      {donor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={!selectedProject}>
                Next
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Setup Complete</CardTitle>
              <CardDescription>You are all set to use the app!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-center">
                {/* Logged in as: <strong>{username}</strong> */}
                <br />
                Project: <strong>{selectedProject}</strong>
                <br />
                Donor: <strong>{selectedDonor}</strong>
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleNext}>
                Enter App
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {renderStep()}
    </div>
  );
}
