<template>
    <div class="person-wrapper">
        <el-card>
            <el-form label-width="120px" label-position="left">
                <el-form-item label="头像">
                    <el-upload v-model:file-list="fileList"
                        action="/" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input disabled v-model="form.username" />
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input placeholder="请输入昵称" v-model="form.nickname" />
                </el-form-item>
                <el-form-item>
                    <el-button>重置</el-button>
                    <el-button type="primary">确定</el-button>
                </el-form-item>
            </el-form>
            <el-divider />
            <el-form label-width="120px" label-position="left">
                <el-form-item label="旧密码">
                    <el-input type="password" show-password v-model="passwordForm.oldpwd" placeholder="请输入旧密码" />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" show-password v-model="passwordForm.newpwd" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" show-password placeholder="请再次输入新密码" v-model="passwordForm.surepwd" />
                </el-form-item>
                <el-form-item>
                    <el-button>重置</el-button>
                    <el-button type="primary">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import UserAvatar from "@/assets/img/user.jpeg"
import { reactive, ref } from 'vue'

const form = reactive({
    avatar: UserAvatar,
    username: "admin",
    nickname: "管理员"
})
const passwordForm = reactive({
    oldpwd: "",
    newpwd: "",
    surepwd: ""
})
const fileList = ref([])
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
</script>