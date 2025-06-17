import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import {
  LoginCredentialsSchema,
  type LoginCredentialsInput,
} from '@/types/schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation()
  const { login, error, isLoading } = useAuth()
  const { theme } = useTheme()

  // RHF + Zod setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentialsInput>({
    resolver: zodResolver(LoginCredentialsSchema),
  })

  // onSubmit calls AuthContext.login
  const onSubmit = async (data: LoginCredentialsInput) => {
    try {
      await login(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  // helper to pick the right logo based on theme
  function SocialButton({
    provider,
    alt,
    onClick,
  }: {
    provider: 'apple' | 'google' | 'facebook'
    alt: string
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  }) {
    const lightOrDark = theme === 'dark' ? 'white' : 'dark'
    const src = `/img/${provider}_${lightOrDark}.webp`
    return (
      <Button
        variant="outline"
        type="button"
        className="flex items-center justify-center p-2"
        onClick={onClick}
      >
        <img src={src} alt={alt} className="h-4 object-contain" />
      </Button>
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-2xl font-bold">{t('auth.welcomeBack')}</h1>
              <p className="text-muted-foreground text-sm">
                {t('auth.subtitle')}
              </p>
            </div>

            {/* Server-side error */}
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {/* Email Field */}
            <div className="grid gap-3">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                autoComplete="username"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder={t('auth.passwordPlaceholder')}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('common.loading') : t('auth.loginButton')}
            </Button>

            {/* Divider */}
            <div className="relative text-center text-sm text-muted-foreground after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
              <span className="relative z-10 px-2 bg-card">
                {t('auth.orContinueWith')}
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <SocialButton
                provider="apple"
                alt={t('auth.loginWithApple')}
                onClick={() => console.log('apple login')}
              />
              <SocialButton
                provider="google"
                alt={t('auth.loginWithGoogle')}
                onClick={() => console.log('google login')}
              />
              <SocialButton
                provider="facebook"
                alt={t('auth.loginWithFacebook')}
                onClick={() => console.log('facebook login')}
              />
            </div>

            {/* Sign-up Link */}
            <div className="text-center text-sm">
              {t('auth.noAccount')}{' '}
              <a href="#" className="underline underline-offset-4">
                {t('auth.signUp')}
              </a>
            </div>
          </form>

          {/* Side Illustration (md+) */}
          <div className="hidden md:block bg-muted relative">
            <img
              src="/img/mock_img.svg"
              alt="Illustration"
              className=" inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms & Privacy */}
      <div className="text-muted-foreground text-center text-xs [a:hover:text-primary] [a:underline] [a:underline-offset-4]">
        {t('auth.tosAgreement')} <a href="#">{t('auth.termsOfService')}</a>{' '}
        &amp; <a href="#">{t('auth.privacyPolicy')}</a>
      </div>
    </div>
  )
}
