<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
    <div class="max-w-screen-lg mx-auto bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="w-1/2 max-sm:w-full p-6 text-center flex flex-col items-center justify-center">
        <h1 class="text-2xl xl:text-3xl font-extrabold mt-5 pb-10">Re.Admin</h1>
        <el-form :model="form" :rules="rules" class="w-10/12" ref="formRef">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入登录账号">
              <template #prepend>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="form.password" placeholder="请输入登录密码">
              <template #prepend><el-icon>
                  <Lock />
                </el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <p class="text-sm text-gray-400">
          <a href="mailto:netblacker@gmail">netblacker@gmail提供技术支持</a>
        </p>
      </div>
      <div class="flex-1 bg-indigo-100 text-center hidden sm:flex">
        <div class="m-8 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url(${dlbox})` }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dlbox from "@/assets/img/dlbox.svg";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { LoginForm, userLogin } from "@/api/login";
import { useRouter } from "vue-router";
import { useUserStore, UserAuthInfo } from "@/store/userStore"

const userStore = useUserStore();
const formRef = ref<FormInstance>();
const form = reactive<LoginForm>({
  username: "admin",
  password: "123456",
});
const router = useRouter()
const login = () => {
  formRef?.value?.validate((valid) => {
    if (valid) {
      userLogin(form).then((res) => {
        userStore.setUser(res.data as UserAuthInfo);
        ElMessage.success(res.message)
        router.replace("/home")
      });
    }
  });
};
const rules: FormRules<LoginForm> = {
  username: [{ required: true, trigger: "blur", message: "账号不能为空" }],
  password: [{ required: true, trigger: "blur", message: "密码不能为空" }],
};
</script>