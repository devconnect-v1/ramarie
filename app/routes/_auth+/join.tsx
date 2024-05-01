import { useForm, getInputProps } from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "~/components/forms";
import { createUserSession, getUserId } from "~/utils/session.server";
import { createUser, getUserByEmail } from "~/utils/user.server";

import lineImg from "../../../public/assets/brand/LineImg.svg";
import logoImg from "../../../public/assets/logo/LogoImg.svg";

const RegisterSchema = z.object({
  username: z.string().min(6),
  date: z
    .date()
    .min(new Date(1900, 0, 1))
    .max(new Date()),
  gender: z.enum(["male", "female", "other"]),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string(),
  redirectTo: z.string().optional(),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: RegisterSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { username, date, email, password, redirectTo } = submission.value;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return submission.reply({
      fieldErrors: { email: ["Email already in use"] },
    });
  }

  const user = await createUser(username, date, email, password);

  return createUserSession({
    redirectTo: redirectTo || "/",
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    id: "join-form",
    constraint: getZodConstraint(RegisterSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: RegisterSchema });
    },
    shouldRevalidate: "onBlur",
  });
  const usernameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fields.username.errors) {
      usernameRef.current?.focus();
    } else if (fields.date.errors) {
      dateRef.current?.focus();
    } else if (fields.email.errors) {
      emailRef.current?.focus();
    } else if (fields.password.errors) {
      passwordRef.current?.focus();
    }
  }, [fields]);

  return (
    <div className="bg-[#DFDACF] size-full flex justify-center items-center overflow-hidden">
      <img
        src={lineImg}
        alt="ligne"
        className="fixed left-0 right-full z-10 min-h-full hidden lg:block"
      />
      <Card className="max-w-7xl container mx-auto bg-white p-5 flex shadow-md rounded-2xl h-screen lg:w-1/2 lg:h-auto ">
        {/* image */}

        <img
          src="https://images.unsplash.com/photo-1513435268174-838c8948bdfc?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="hidden lg:block w-[40%] object-cover object shadow-xl z-0 rounded-3xl"
        />

        {/* form */}
        <div className="mx-auto w-1/2 max-w-lg min-h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={logoImg} alt="ramarie logo" className="w-32 h-32" />
            <h1 className="font-bold text-4xl">S&apos;inscrire</h1>
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
              labelProps={{ children: "Nom d'utilisateur" }}
              inputProps={{
                ...getInputProps(fields.username, {
                  type: "text",
                }),
                placeholder: "Ramarie",
              }}
              errors={fields.username.errors}
              errorId={fields.username.errorId}
            />
            <Field
              labelProps={{ children: "Date de naissance" }}
              inputProps={{
                ...getInputProps(fields.date, {
                  type: "date",
                }),
                placeholder: "Ramarie",
              }}
              errors={fields.date.errors}
              errorId={fields.date.errorId}
            />
            <Field
              labelProps={{ children: "Email" }}
              inputProps={{
                ...getInputProps(fields.email, {
                  type: "email",
                }),
                placeholder: "Ramarie",
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
            <Field
              labelProps={{ children: "Confirmation du mot de passe" }}
              inputProps={{
                ...getInputProps(fields.confirm, {
                  type: "password",
                }),
                placeholder: "********",
              }}
              errors={fields.confirm.errors}
              errorId={fields.confirm.errorId}
            />

            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button
              type="submit"
              className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/80 focus:bg-blue-400"
            >
              Enregister
            </Button>
            <div className="flex items-center justify-center">
              <div className="text-center text-sm text-gray-500">
                Vous êtes déjà sur Ramarie ?{" "}
                <Link
                  className="text-blue-500 underline"
                  to={{
                    pathname: "/login",
                    search: searchParams.toString(),
                  }}
                >
                  Connectez vous ici
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
