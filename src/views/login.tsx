import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { LoginData, authApi } from "@/api/auth"
import bg from "@/assets/image/login_bg.jpg"
import { useToast } from "@/components/toast"
import { Time } from "@/util/duration"
import { delayedPromise } from "@/util/promise"

export default function Login() {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const login = useMutation(delayedPromise(1 * Time.Second, authApi.login), {
    onError(err: Error) {
      toast.error(err.message)
    },
  })

  const onSubmit = useCallback(
    (data: LoginData) => {
      login.mutate(data)
    },
    [login],
  )

  return (
    <main className="h-screen relative" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
      <Modal isOpen hideCloseButton size="sm" backdrop="blur">
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>登录</ModalHeader>
            <ModalBody>
              <div className="space-y-unit-sm">
                <Input
                  label="Username"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Enter your Username/Mobile"
                  validationState={errors.username ? "invalid" : "valid"}
                  {...register("username", {
                    required: true,
                  })}
                />
                <Input
                  type="password"
                  label="Password"
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
            </ModalBody>
            <ModalFooter>
              <Button isLoading={login.isLoading} color="primary" onClick={handleSubmit(onSubmit)}>
                登录
              </Button>
              <Button color="primary" variant="light">
                注册
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </main>
  )
}
