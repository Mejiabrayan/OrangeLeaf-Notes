'use client';

import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useForm } from "react-hook-form";

export default function SettingsPage() {
  const form = useForm();

  return (
    <Form form={form} onSubmit={data => console.log(data)}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="shadcn@example.com" {...field} />
            </FormControl>
            <FormDescription>We will send you emails about your account.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save changes</Button>
    </Form>
  );
}