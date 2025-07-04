import { AdminLoginForm } from '@/components/auth/admin-login-form';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <title>Login</title>
      <div className="w-full max-w-sm">
        <AdminLoginForm />
      </div>
    </div>
  );
}
