import { SignUpForm } from "@/components/SignUpForm"
import greenHubLogo from "@/assets/images/green-hub.svg"
import registerImage from "@/assets/images/register-image.png"
import Image from "next/image"
import Link from "next/link"

export default function Register() {

    return <div className="min-h-full flex ">
        <div className="py-12 px-4 flex-1 flex flex-col justify-center">
            <div className="max-w-96 w-full mx-auto">
                <div>
                    <Image src={greenHubLogo} alt="Green Hub" width={0} height={0} className="h-10 w-auto" />
                    <h2 className="text-2xl mt-8 font-bold tracking-tight text-gray-800">Register your account</h2>
                </div>

                <div className="mt-10">
                    <SignUpForm />

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        <div className="hidden lg:block w-0 relative flex-1 p-6">
            <Image src={registerImage} alt="Register" width={0} height={0} className="w-full h-full" />
        </div>
    </div>
}