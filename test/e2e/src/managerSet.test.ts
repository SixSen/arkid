import { UserAction } from './actions/user';
import {Page, launch} from 'puppeteer';
import config from './config';
import expectPuppeteer = require('expect-puppeteer');
import {groupAction} from './actions/group';
import {configManageAction} from './actions/configManage';
import {appsManageAction} from './actions/appsManage';
import {managerSettingAction} from './actions/managerSetting';

declare var global: any

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const managerBtn = await page.waitForSelector('a[href="#/admin/manager"]');
        await managerBtn.click();

        await page.waitFor(3000);
        
    },400000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证设置子管理员页面链接' , async() => {
        const url = await page.url();
        await expect(url).toMatch('#/admin/manager');
    },30000);

    test('TEST_002:验证设置子管理员是否生效' , async() => {
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSetting(page);
        
        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('bumen3user');
    },310000);

    test('TEST_003:验证设置子管理员的管理范围是否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'bumen3user', 'bumen3user');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const groupBtn = await page.waitForSelector('.header-middle a[href="#/admin/group"]');
        await groupBtn.click();

        await page.waitFor(3000);

        const groupName = await page.$eval('.ui-tree-item.active>span>span', elem => {
            return elem.innerHTML;
        });
        await expect(groupName).toContain('部门三 ( 1 人 )');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

    },500000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSettinga(page, "部门一");

        page = await global.browser.newPage();
        await page.goto(config.url);

        await useraction.login(page, 'admin', 'admin');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const managerBtn = await page.waitForSelector('a[href="#/admin/manager"]');
        await managerBtn.click();

        await page.waitFor(3000);

        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('mei111');
    },200000);

    test('TEST_001:验证设置子管理员添加账号是否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'mei111', 'mei111');

        let groupaction = new groupAction();
        await groupaction.groupAddress(page);
        await groupaction.addUser(page, "mei111add", "mei111add", "mei111add", "mei111add");
        
        const userName = await page.$eval('.ivu-table-tbody>tr>td:nth-child(2)>div>span', elem => {
            return elem.innerHTML;
        });
        await expect(userName).toEqual('mei111add');
    },50000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

    },500000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证设置子管理员是否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSettingb(page, "人力");

        page = await global.browser.newPage()
        await page.goto(config.url);

        await useraction.login(page, 'admin', 'admin');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const managerBtn = await page.waitForSelector('a[href="#/admin/manager"]');
        await managerBtn.click();

        await page.waitFor(3000);

        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('mei222');
    },200000);

    test('TEST_002:验证设置子管理员添加应用是否生效' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'mei222', 'mei222');

        let appsmanageaction = new appsManageAction();
        await appsmanageaction.addApps(page, "测试应用", "", "ceshiyingyong");

        await page.waitFor(3000);

        const appName = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(2) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('测试应用');

        const remarks = await page.$eval('.ivu-table-tbody>tr:last-child>td:nth-child(3) .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(remarks).toEqual('ceshiyingyong');
    },50000);


    test('TEST_003:验证设置子管理员查看日志' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'mei222', 'mei222');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const lookLogBtn = await page.waitForSelector('.header-middle a[href="#/admin/oplog"]');
        await lookLogBtn.click();

        await page.waitFor(3000);

        const loginLog = await page.$eval('.ivu-table-tbody>tr>td>div>div', elem => {
            return elem.innerHTML;
        });
        await expect(loginLog).toEqual('登录');
    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
    },400000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证设置子管理员添加应用是否生效' , async() => {
        const appName = await page.$eval('.card-list.flex-row>li:first-child .name', elem => {
            return elem.innerHTML;
        });
        await expect(appName).toEqual('测试应用');

        await page.waitFor(1000);

        const remarks = await page.$eval('.card-list.flex-row>li:first-child .intro', elem => {
            return elem.innerHTML;
        });
        await expect(remarks).toEqual('ceshiyingyong');

    },30000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

    },500000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证设置子管理员是否成功' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let managersettingaction  = new managerSettingAction();
        await managersettingaction.managerSettingc(page);

        page = await global.browser.newPage()
        await page.goto(config.url);

        await useraction.login(page, 'admin', 'admin');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const managerBtn = await page.waitForSelector('a[href="#/admin/manager"]');
        await managerBtn.click();

        await page.waitFor(3000);

        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('mei333');

    },200000);

    test('TEST_002:验证设置子管理员公司信息配置' , async() => {
        let configmanageaction = new configManageAction();
        await configmanageaction.loginSetting(page, "111");

        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'mei333', 'mei333');

        const companyName = await page.$eval('.org-name', elem => {
            return elem.innerHTML;
        });
        await expect(companyName).toEqual('111');
    },400000);

})

describe('一账通-测试设置子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

    },500000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证设置子管理员应用权限' , async() => {
        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');
        let managersettingaction = new managerSettingAction();
        await managersettingaction.managerSettingd(page); 

        page = await global.browser.newPage()
        await page.goto(config.url);

        await useraction.login(page, 'admin', 'admin');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const managerBtn = await page.waitForSelector('a[href="#/admin/manager"]');
        await managerBtn.click();

        await page.waitFor(3000);

        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('axiangmuzuuser');
    },260000);

    test('TEST_001:验证设置子管理员应用权限' , async() => {

        let useraction = new UserAction();
        await useraction.login(page, 'axiangmuzuuser', 'axiangmuzuuser');
        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const appSetBtn = await page.waitForSelector('.header-middle a[href="#/admin/app"]');
        await appSetBtn.click();

        await page.waitFor(3000);

        const appName1 = await page.$eval('.ivu-table-row>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(appName1).toEqual('猎聘');

        await page.waitFor(2000);

        const editBtn = await page.waitForSelector('.ivu-table-row .flex-row>span:nth-child(2)');
        await editBtn.click();

        await page.waitFor(2000);

        const appNameInput = await page.waitForSelector('input[placeholder="填写应用名称"]');
        await appNameInput.type("111");

        const keepBtn = await page.waitForSelector('.buttons-right .ivu-btn.ivu-btn-primary');
        await keepBtn.click();

        await page.waitFor(3000);

        const appName2 = await page.$eval('.ivu-table-row>td:nth-child(2) span', elem => {
            return elem.innerHTML;
        });
        await expect(appName2).toEqual('猎聘111');

    },100000);

})

describe('一账通-测试编辑子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let managersettingaction = new managerSettingAction();
        await managersettingaction.editManager(page);

    },400000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证编辑子管理员权限' , async() => {
        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'bumen2user', 'bumen2user');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        const logBtn = await page.waitForSelector('.header-middle a[href="#/admin/oplog"]');
        await logBtn.click();

        await page.waitFor(3000);

        const loginLog = await page.$eval('.ivu-table-tbody>tr>td>div>div', elem => {
            return elem.innerHTML;
        });
        await expect(loginLog).toEqual('登录');

    },200000);

})

describe('一账通-测试删除子管理员', () => {
    let page : Page;
    
    beforeEach( async () => {
        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        let managersettingaction = new managerSettingAction();
        await managersettingaction.deleteManager(page);
    },400000)
    afterAll ( async () => {
        //await page.close();
    })

    test('TEST_001:验证删除子管理员' , async() => {
        page = await global.browser.newPage()
        await page.goto(config.url);

        let useraction = new UserAction();
        await useraction.login(page, 'admin', 'admin');

        const manageBtn = await page.waitForSelector('.workspace-btn.ivu-btn.ivu-btn-default');
        await manageBtn.click();

        await page.waitFor(2000);

        const managerBtn = await page.waitForSelector('a[href="#/admin/manager"]');
        await managerBtn.click();

        await page.waitFor(5000);

        const managerName = await page.$eval('.ivu-table-tbody>tr:last-child .ivu-table-cell span', elem => {
            return elem.innerHTML;
        });
        await expect(managerName).toEqual('ad');

    },80000);

})