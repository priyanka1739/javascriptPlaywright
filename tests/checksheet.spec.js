import { test, expect } from '@playwright/test';

test('checksheet testing', async ({ page, context }) => {

    const urls =[ 
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/online-fashion-degree/",
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/technical-communication-user-experience-bs/",
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/bachelor-science-technological-entrepreneurship-and-management/",
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/inquiry-based-learning-degree/",
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/tourism-and-recreation-management-bs/",
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/bachelor-science-urban-planning/",
        "https://asuonline.asu.edu/online-degree-programs/undergraduate/user-experience-ux/",
    ];

    // await page.goto("https://asuonline.asu.edu/online-degree-programs/undergraduate");
    // const programLink = page.locator("a [href*='/online-degree-programs/undergraduate/accounting-degree/']");

    // await Promise.all([page.waitForNavigation(), programLink.nth(0).click()]);

    for (const newUrl of urls) {
        await page.goto(newUrl, { timeout: 90000, waitUntil: 'domcontentloaded' });
        await page.locator("p:has-text('Quick facts')").waitFor();

        const coursesNav = page.locator('#nav-item-program-courses');
        if (await coursesNav.count()) {
            await coursesNav.click();
        }

        const courseLink = page.getByRole('link', { name: /view course curriculum/i }).first();
        if (!await courseLink.isVisible({ timeout: 15000 }).catch(() => false)) {
            console.log(`invalid: ${newUrl}`);
            continue;
        }
        await courseLink.scrollIntoViewIfNeeded();

        const [newpage] = await Promise.all([
            context.waitForEvent('page'),
            courseLink.click(),
        ]);

        await newpage.locator('#pat_middle_section').waitFor();
        await expect(newpage).toHaveURL(/2025/);
        console.log(`pass: ${newUrl}`);
        await newpage.close();
    }
});
