export type FeatureToggle = {
    [key: string]: boolean;
};

export const featureToggles: FeatureToggle = {
    canPurchase: false,
    canJoinMailingList: true
};

export const isFeatureEnabled = (feature: keyof typeof featureToggles): boolean => {
    return featureToggles[feature] || false;
};