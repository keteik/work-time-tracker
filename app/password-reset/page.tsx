import { PasswordResetForm } from '../../components/auth/password-reset-form';

export default function PasswordResetPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <title>Reset password</title>
      <div className="w-full max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  );
}
