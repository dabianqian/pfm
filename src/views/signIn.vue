<template>
    <div class="box">
        <div class="small_box">
            <h3>登录</h3>
            <div class="formBox">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="captcha">
                        <div class="vPicBox">
                            <el-input v-model="ruleForm.captcha" style="width: 80px"></el-input>
                            <div class="vPic">
                                <div class="code" @click="refreshCode">
                                    <s-identify :identify-code="identifyCode">
                                    </s-identify>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-line no-unused-vars
import SIdentify from "@/components/SIdentify.vue";

export default {

    name: "signIn",
    components: {SIdentify},
    data() {

        let checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            if (!/^[0-9]*$/.test(value)) {
                return callback(new Error('用户名只能为数字'));
            } else {
                callback();
            }

        };
        var validCode = (rule, value, callback) => {
            if (this.identifyCode != value) {
                this.refreshCode()
                callback(new Error("请输入正确的验证码"));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: '',
                name: '',
                captcha: ''
            },
            identifyCode: "",// 验证码
            identifyCodes: '1234567890',//验证码随机范围
            rules: {
                pass: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                name: [
                    {validator: checkEmail, trigger: 'blur'}
                ],
                captcha: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                    {required: true, validator: validCode, trigger: 'blur'},

                ]
            }
        };
    },
    mounted() {
        //组件挂载完毕刷新验证码
        this.refreshCode()
    },
    methods: {
        refreshCode() {
            this.identifyCode = ''
// 4位验证码可以根据自己需要来定义验证码位数
            this.makeCode(this.identifyCodes, 4)
        },
// 随机数
        randomNum(min, max) {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 随机生成验证码字符串
        makeCode(data, len) {
            for (let i = 0; i < len; i++) {
                this.identifyCode += data[this.randomNum(0, data.length - 1)]
            }
            console.log("随机验证码:", this.identifyCode)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.$notify({
                        title: '提交成功',
                        message: '登录成功',
                        type: 'success'
                    });

                } else {

                    this.$notify.error({
                        title: '提交错误',
                        message: '请输入正确的登陆格式'
                    });
                    // console.log('error submit!!');
                    // return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>

.box {
    background: url("../img/background.jpg") no-repeat center center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0 auto;
}

.small_box {
    position: absolute;
    right: 250px;
    top: 170px;
    width: 360px;
    height: 370px;
    background-color: white;
    border-radius: 10px;
    margin: 0 auto;
}

.formBox {
    margin-right: 35px;
}

h3 {
    text-align: center;
    margin-top: 0;
    padding-top: 15px;
}

#canvas {
    vertical-align: middle;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: pointer;
}

.vPicBox {
    display: flex;
    line-height: 0;
}

/deep/ .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: '';

}
</style>