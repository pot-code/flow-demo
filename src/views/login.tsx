import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { LoginData, authApi } from "@/api/auth"
import bg from "@/assets/image/login_bg.webp"
import Toast from "@/components/toast/toast"
import useAuthStore from "@/features/auth/use-auth-store"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"
import { HttpError } from "@/core/http/error"

export default function Login() {
  const [showError, setShowError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const navigate = useNavigate()
  const timerRef = useRef<number>()
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()
  const login = useMutation(delayedPromise(1 * Time.Second, authApi.login), {
    onSuccess: () => {
      setIsAuthenticated(true)
      navigate("/dashboard")
    },
    onError: (err: HttpError) => {
      setShowError(true)
      setErrorMessage(err.message)
    },
  })

  const onSubmit = useCallback(
    (data: LoginData) => {
      login.mutate(data)
    },
    [login],
  )

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (showError) {
      timerRef.current = window.setTimeout(() => {
        setShowError(false)
      }, 3 * Time.Second)
    }
  }, [showError])

  return (
    <div className="h-screen grid grid-cols-12 grid-rows-6 bg-gradient-to-tr from-blue-800 to-purple-50">
      <div
        className="relative col-start-3 row-start-2 col-span-8 row-span-4 rounded-2xl"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <Card className="absolute w-[360px] inset-y-0 right-0">
          <CardBody className="justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-unit-sm">
                <Input
                  label="用户名"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Enter your Username"
                  validationState={errors.username ? "invalid" : "valid"}
                  {...register("username", {
                    required: true,
                  })}
                />
                <Input
                  type="password"
                  label="密码"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Enter your Password"
                  validationState={errors.password ? "invalid" : "valid"}
                  errorMessage=""
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <motion.div
                style={{ opacity: 0 }}
                animate={{ opacity: showError && login.isError ? 1 : 0 }}
                className="absolute bottom-0 inset-x-0 m-unit-md"
              >
                <Toast type="error" title={errorMessage} onClose={() => {}} />
              </motion.div>
            </form>
          </CardBody>
          <CardFooter className="gap-unit-sm justify-end">
            <Button isLoading={login.isLoading} color="primary" onClick={handleSubmit(onSubmit)}>
              登录
            </Button>
            <Button color="primary" variant="light">
              注册
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
