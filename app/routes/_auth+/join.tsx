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

import { Field } from "~/components/forms";
import { createUserSession, getUserId } from "~/utils/session.server";
import { createUser, getUserByEmail } from "~/utils/user.server";

const RegisterSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
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

  const { email, password, redirectTo } = submission.value;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return submission.reply({
      fieldErrors: { email: ["Email already in use"] },
    });
  }

  const user = await createUser(email, password);

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
    id: "login-form",
    constraint: getZodConstraint(RegisterSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: RegisterSchema });
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
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form
          method="post"
          className="space-y-6"
          id={form.id}
          aria-invalid={form.errors ? true : undefined}
          aria-describedby={form.errors ? form.errorId : undefined}
        >
          <Field
            labelProps={{ children: "Email address" }}
            inputProps={{ ...getInputProps(fields.email, { type: "email" }) }}
            errors={fields.email.errors}
            errorId={fields.email.errorId}
          />

          <Field
            labelProps={{ children: "Password" }}
            inputProps={getInputProps(fields.password, { type: "password" })}
            errors={fields.password.errors}
            errorId={fields.password.errorId}
          />

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
