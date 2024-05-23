import { ONBOARDING_STEPS } from "@enums";

export interface UsersDTO {
    id?: string;  // Optional because this can also be used to create a new user.
    onboarding: ONBOARDING_STEPS;
}
