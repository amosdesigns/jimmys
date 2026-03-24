import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { SplashRedirect } from "@/components/splash-redirect";
import { Logo } from "@/components/logo";
import { prisma } from "@/lib/prisma";

const DEFAULT_IMAGE = "/images/hamburger.svg";

async function getLastOrderImage(email: string): Promise<string | null> {
  const customer = await prisma.customer.findUnique({
    where: { email },
    select: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          items: {
            take: 1,
            select: {
              product: {
                select: { imageUrl: true },
              },
            },
          },
        },
      },
    },
  });

  return customer?.orders[0]?.items[0]?.product?.imageUrl ?? null;
}

export default async function Home() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const lastOrderImage = email ? await getLastOrderImage(email) : null;
  const heroImage = lastOrderImage ?? DEFAULT_IMAGE;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg sm:h-52 sm:w-52">
        <Image
          src={heroImage}
          alt={lastOrderImage ? "Your last order" : "Delicious hamburger"}
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-4xl sm:text-5xl">
        <Logo />
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Great to see you again,{" "}
        <span className="font-semibold text-foreground">
          {user?.firstName ?? "friend"}
        </span>
        !
      </p>
      <SplashRedirect />
    </div>
  );
}
