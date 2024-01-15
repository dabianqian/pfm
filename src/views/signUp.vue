<template>
    <div class="box">
        <div class="signUpBox">
            <h3>注册</h3>
            <div class="formBox">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="电话号码" prop="account">
                        <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="identity">
                        <el-input v-model="ruleForm.identity"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
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
export default {
    name: "signUp",
    data() {
        let validateAccount = (rule, value, callback) => {
            console.log(value)
            let reg = /^(\+\d+)?1[3456789]\d{9}$/;
            if (value === '') {
                callback(new Error('请输入电话号码'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        let validateIdentity = (rule, value, callback) => {
            let regex = /^[1-9]\d{16}[a-zA-Z0-9]{1}$/;
            if (value === '') {
                callback(new Error('请输入身份证号码'));
            } else if (!regex.test(value)) {
                callback(new Error('请输入正确的身份证号码'));
            } else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('密码长度不能少于6位'));
            } else {
                if (this.ruleForm.checkPassword !== '') {
                    this.$refs.ruleForm.validateField('checkPassword');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                account: '',
                identity: '',
                password: '',
            },
            rules: {
                account: [
                    {validator: validateAccount, trigger: 'blur'}
                ],
                identity: [
                    {validator: validateIdentity, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                checkPassword: [
                    {validator: validatePass2, trigger: 'blur'}
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
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

.signUpBox {
    background-color: white;
    height: 370px;
    width: 360px;
    right: 250px;
    top: 170px;
    position: absolute;
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

</style>