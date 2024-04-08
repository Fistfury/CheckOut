import { RegisterForm } from "../components/RegisterForm"

export const RegisterPage = () => {

    return (
        <>
         <div className="flex justify-center items-center min-h-screen bg-beard-cream">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-beard-dark">Register</h1>
        <RegisterForm />
        </div>
        </div>
        </>
    )
}