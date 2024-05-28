// e2e/onboarding.test.js
describe('Onboarding Test', () => {
    beforeAll(async () => {
        await device.launchApp({ delete: true });
    });

    it('should show the first onboarding screen', async () => {
        await expect(element(by.text('Vermijd ongewenste ingrediënten'))).toBeVisible();
    });

    it('should swipe to the second onboarding screen', async () => {
        await element(by.id('onboardingContainer')).swipe('left');
        await expect(element(by.text('Scan de productlabel voor snelle feedback'))).toBeVisible();
    });

    it('should swipe to the third onboarding screen', async () => {
        await element(by.id('onboardingContainer')).swipe('left');
        await expect(element(by.text('Laten we beginnen'))).toBeVisible();
    });

    it('should complete the onboarding process', async () => {
        await element(by.id('continueButton')).tap();
        await expect(element(by.text('Home Screen'))).toBeVisible();
    });

    it('should skip the onboarding process', async () => {
        await device.launchApp({ delete: true });
        await element(by.id('skipButton')).tap();
        await expect(element(by.text('Home Screen'))).toBeVisible();
    });
});
