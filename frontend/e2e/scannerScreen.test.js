describe('Scanner screen', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('"take photo" button should be visible', async () => {
        await expect(element(by.id('take-photo-button'))).toBeVisible();
    });

    // it('shows "Hi!" after tapping "Click me"', async () => {
    //   await element(by.id('click-me-button')).tap();
    //   await expect(element(by.text('Hi!'))).toBeVisible();
    // });
});
