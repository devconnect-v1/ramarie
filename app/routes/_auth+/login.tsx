import { getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Field } from "~/components/forms";
import { createUserSession, getUserId } from "~/utils/session.server";
import { verifyLogin } from "~/utils/user.server";

import LineImg from "../../../public/assets/brand/LineImg.svg";
import logoImg from "../../../public/assets/logo/LogoImg.svg";

export const LoginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8, "Password must have at lease 6 characters"),
  redirectTo: z.string().optional(),
  remember: z.string().optional(),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: LoginSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password, redirectTo, remember } = submission.value;
  const user = await verifyLogin(email, password);

  if (!user) {
    return submission.reply({
      formErrors: ["Invalid email or password"],
    });
  }

  return createUserSession({
    redirectTo: redirectTo || "/",
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";

  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    id: "login-form",
    constraint: getZodConstraint(LoginSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },
    shouldRevalidate: "onBlur",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fields.email.errors) {
      emailRef.current?.focus();
    } else if (fields.password.errors) {
      passwordRef.current?.focus();
    }
  }, [fields]);

  return (
    <div className="bg-[#DFDACF] size-full flex justify-center items-center overflow-x-hidden overscroll-none ">
      <img
        src={LineImg}
        alt="ligne"
        className="fixed left-0 right-full z-10 min-h-full hidden lg:block"
      />
      <Card
        className={cn(
          "max-w-7xl container mx-auto bg-white p-5 flex shadow-md rounded-2xl h-screen lg:w-1/2 lg:h-auto ",
        )}
      >
        {/* image */}

        <img
          src="https://images.unsplash.com/photo-1513435268174-838c8948bdfc?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="hidden lg:block w-[40%] object-cover object shadow-xl z-0 rounded-3xl"
        />

        {/* form */}
        <div className="mx-auto w-1/2 max-w-md px-8 min-h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center space-x-2">
            <img src={logoImg} alt="ramarie logo" className="w-32 h-32" />
            <h1 className="font-bold text-4xl">Se connecter</h1>
          </div>
          <Form
            method="post"
            className="space-y-6"
            id={form.id}
            aria-invalid={form.errors ? true : undefined}
            aria-describedby={form.errors ? form.errorId : undefined}
          >
            <div id={form.errorId} className="pt-1 text-red-700">
              {form.errors}
            </div>
            <Field
              labelProps={{ children: "Email" }}
              inputProps={{
                ...getInputProps(fields.email, {
                  type: "email",
                }),
                placeholder: "user@gmail.com",
              }}
              errors={fields.email.errors}
              errorId={fields.email.errorId}
            />

            <Field
              labelProps={{ children: "Mot de passe" }}
              inputProps={{
                ...getInputProps(fields.password, {
                  type: "password",
                }),
                placeholder: "********",
              }}
              errors={fields.password.errors}
              errorId={fields.password.errorId}
            />

            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Se souvenir de moi
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/80 focus:bg-blue-400"
            >
              Connexion
            </button>
            <div className="flex items-center justify-center">
              <div className="text-center text-sm text-gray-500">
                Vous n&apos;êtes pas encore sur Ramarie ?{" "}
                <Link
                  className="text-blue-500 underline"
                  to={{
                    pathname: "/join",
                    search: searchParams.toString(),
                  }}
                >
                  S&apos;inscrire
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
