import * as Mock from "mockjs";

type language = "zh" | "en";

type Template = { [key in language]: object | string };

const _multiple = {
  // mock 英文:中文， 1:3
  zh: 3,
};

const handleMultiple = (lang: "zh", num?: number) => {
  return num ? num * _multiple[lang] : undefined;
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Mock,
      // 标题
      MockTitle: (min?: number, max?: number) => {
        return {
          en: Mock.Random.title(min, max),
          zh: Mock.Random.ctitle(
            handleMultiple("zh", min),
            handleMultiple("zh", max)
          ),
        };
      },

      // 内容
      MockContent: (min?: number | undefined, max?: number | undefined) => {
        return {
          en: Mock.Random.paragraph(min, max),
          zh: Mock.Random.cparagraph(min, max),
        };
      },

      // 列表
      MockList: (num: number, resize?: string) => {
        const template: { [key: string]: object | string } = {};

        template[`en|${num}`] = [
          {
            title: "@title",
            desc: "@sentence",
            content: "@paragraph(1, 12)",
            fav: "@natural(1,999)",
            author: "@name",
            date: "@date('yyyy-MM-dd')",
            price: () => "$" + Mock.Random.float(1, 1000).toFixed(2),
            image: () => usePicsum(resize || "/500/500"),
            authorAvatar: () => usePicsum("/200/200"),
          },
        ];
        template[`zh|${num}`] = [
          {
            title: "@ctitle",
            desc: "@csentence",
            content: "@cparagraph(1, 12)",
            fav: "@natural(1,999)",
            author: "@cname",
            date: "@date('yyyy-MM-dd')",
            price: () => "￥" + Mock.Random.float(1, 1000).toFixed(2),
            image: () => usePicsum(resize || "/500/500"),
            authorAvatar: () => usePicsum("/200/200"),
          },
        ];

        return Mock.mock(template) as Template;
      },

      // word
      MockWord: (min?: number, max?: number) => {
        return {
          en: Mock.Random.word(min || 1, max || 5),
          zh: Mock.Random.cword(min || 1, max || 2),
        };
      },

      // 职位
      MockJob: () => {
        return {
          en: Mock.Random.pick([
            "Data Scientist",
            "DevOps Engineer",
            "Data Engineer",
            "Tax Manager",
            "Analysis Manager",
            "HR Manager",
            "Database Administrator",
            "Strategy Manager",
            "UX Designer",
            "Solutions Architect",
            "Marketing Manager",
            "Occupational Therapist",
            "Audit Manager",
            "Electrical Engineer",
            "Nurse Practitioner",
            "Software Engineer",
            "Corporate Recruiter",
            "Supply Chain Manager",
            "Finance Manager",
            "Mechanical Engineer",
            "Communications Manager",
            "QA Manager",
            "Controls Engineer",
            "Nurse Manager",
            "Compliance Manager",
            "Mobile Developer",
            "Systems Administrator",
            "Executive Assistant",
            "Technical Account Manager",
            "Hardware Engineer",
            "Intelligence Analyst",
            "Product Manager",
            "Professor",
            "Physician",
            "Compensation Analyst",
            "Civil Engineer",
            "Research Engineer",
            "Accounting Manager",
            "Information Security Engineer",
            "Manufacturing Engineer",
            "Security Analyst",
            "Business Operations Manager",
            "UI Designer",
            "Pharmacy Manager",
            "Supplier Quality Engineer",
            "National Sales Manager",
            "Business Intelligence Developer",
            "Dental Hygienist",
            "Physical Therapist",
            "Construction Project Manager",
          ]),
          zh: Mock.Random.pick([
            "数据科学家",
            "DevOps工程师",
            "数据工程师",
            "税务经理",
            "分析经理",
            "人力资源经理",
            "数据库管理员",
            "战略管理人",
            "用户体验设计师",
            "解决方案架构师",
            "营销经理",
            "职业治疗师",
            "审计经理",
            "电气工程师",
            "护士",
            "软件工程师",
            "公司招聘人员",
            "供应链经理",
            "财务经理",
            "机械工程师",
            "通讯经理",
            "质量保证经理",
            "控制工程师",
            "护士经理",
            "合规经理",
            "移动开发人员",
            "系统管理员",
            "行政助理",
            "技术账户经理",
            "硬件工程师",
            "情报分析员",
            "产品经理",
            "教授",
            "医生",
            "薪酬分析员",
            "土木工程师",
            "研究工程师",
            "会计经理",
            "信息安全工程师",
            "制造工程师",
            "安全分析员",
            "业务业务经理",
            "UI设计师",
            "药房经理",
            "供应商质量工程师",
            "国家销售经理",
            "商业智能开发商",
            "牙科保健员",
            "理疗师",
            "建筑项目经理",
          ]),
        };
      },

      // daisyui colors types
      MockDaisyColorType: (min?: number, max?: number) => {
        const _colors = [
          "primary",
          "secondary",
          "accent",
          "info",
          "success",
          "warning",
          "error",
        ];

        if (!min) {
          return _colors;
        }
        const json: { [key: string]: string[] } = {};
        let key = `array|${min}`;
        if (max) {
          key += `-${max}`;
        }

        json[key] = _colors;

        return Mock.mock(json).array;
      },

      // keywords
      MockKeywords: () => {
        return {
          en: {
            readMore: "read more",
            previous: "previous",
            next: "next",
            welcome: "welcome to",
            signUp: "sign up",
            signIn: "sign in",
            name: "name",
            firstName: "first name",
            phone: "phone number",
            lastName: "last name",
            confirmPwd: "confirm password",
            pwd: "password",
            forgetPwd: "forgot your password?",
            email: "e-mail",
            detail: "detail",
            submit: "submit",
            noAccount: "Don'thave an account?",
            menu: [
              {
                icon: "home",
                text: "home",
              },
              {
                icon: "person",
                text: "About",
              },
              {
                icon: "content_copy",
                text: "Categories",
              },
              {
                icon: "search",
                text: "Search",
              },
              {
                icon: "collections_bookmark",
                text: "Archive",
              },
            ],
          },
          zh: {
            readMore: "查看更多",
            previous: "上一页",
            next: "下一页",
            welcome: "欢迎来到",
            signUp: "注册",
            signIn: "登录",
            name: "姓名",
            firstName: "姓氏",
            lastName: "名字",
            phone: "手机号码",
            pwd: "密码",
            confirmPwd: "确认密码",
            forgetPwd: "忘记密码？",
            email: "邮箱",
            detail: "详情",
            submit: "提交",
            noAccount: "没有账号？",
            menu: [
              {
                icon: "home",
                text: "主页",
              },
              {
                icon: "person",
                text: "关于我",
              },
              {
                icon: "content_copy",
                text: "分类",
              },
              {
                icon: "search",
                text: "搜索",
              },
              {
                icon: "collections_bookmark",
                text: "归档",
              },
            ],
          },
        };
      },

      // name
      MockName: () => {
        return {
          en: Mock.mock("@name"),
          zh: Mock.mock("@cname"),
        };
      },
    },
  };
});
