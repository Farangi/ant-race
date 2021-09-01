import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from "react-router-dom"
import { ROUTE_NAMES } from '../../routes/route_names';
import './Login.css';

function Login() {
    const appHistory = useHistory()

    /**
     * Validating credentials format
     * @param values : { email, password }
     * @returns errors : { email, password }
     */
    const handleValidate = (values: { email: string, password: string }) => {
        const errors: any = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    }

    return (
        <div>

            <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto my-10">
                        <div className="text-center">
                            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Ant's Race</h1>
                            <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                        </div>
                        <div className="m-7">
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validate={handleValidate}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(false);

                                    const usersList = JSON.parse(window.localStorage.getItem("usersList") || '{}')

                                    const foundUser = usersList?.find(
                                        (user: { email: string, password: string }) => values.email === user.email
                                    )
                                    if (!!foundUser) {

                                        if (foundUser.password === values.password) {
                                            window.localStorage.setItem("userToken", values.email)
                                        } else {
                                            alert("Wrong password!")
                                        }

                                    } else {
                                        window.localStorage.setItem("usersList", JSON.stringify([
                                            ...usersList,
                                            { email: values.email, password: values.password }
                                        ]))
                                        window.localStorage.setItem("userToken", values.email)
                                    }

                                    appHistory.push(ROUTE_NAMES.home)

                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>

                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                                            <Field type="email" name="email" id="email" placeholder="you@company.com" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                            <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                                <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                                            </div>
                                            <Field type="password" name="password" id="password" placeholder="Your Password" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                                            <ErrorMessage name="password" component="div" className="text-xs text-red-500" />
                                        </div>
                                        <div className="mb-6">
                                            <button
                                                disabled={isSubmitting}
                                                type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>


            <div className="fixed bottom-5 w-full text-center text-gray-400">
                Crafted with ♡ by <a className="text-blue-500" target="_blank" href="https://www.linkedin.com/in/saad-zafar-4a7040169/">Saad Zafar</a>
            </div>
        </div>
    )
}

export default Login
