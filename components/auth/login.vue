
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { Account } from "appwrite";
import { ACCOUNT } from "~/libs/appwrite";
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();
const toast = useToast()
const isLoading = ref(false)
let errorMessage = ref('')
const router = useRouter()

defineProps({
  
  toggleLogin: {
    type: Function,
    required: true,
  },

});

const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Email is required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true
  const { email, password } = event.data;
  try {
    await ACCOUNT.createEmailSession(email, password);
    const response = await ACCOUNT.get();

    authStore.set({
      email: response.email,
      id: response.$id,
      name: response.name,
      status: response.status,
    });
    
    toast.add({
			title: 'Logged in',
			description: 'You are now logged in',
		})

    isLoading.value = false
    router.push('/')
  } catch (error: any) {
    errorMessage.value = error.message
    isLoading.value = false
  }
}
</script>

<template>
   <UAlert
		icon="i-heroicons-command-line"
		:description="errorMessage"
		title="Error"
		v-if="errorMessage"
		color="red"
		variant="outline"
	/>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" color="blue" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" color="blue" />
    </UFormGroup>

		<UButton
			type="submit"
			color="blue"
			class="w-full"
			block
			size="lg"
			:disabled="isLoading"
		>
			<template v-if="isLoading">
				<Icon name="svg-spinners:3-dots-fade" class="w-5 h-5" />
			</template>
			<template v-else>Next</template>
		</UButton>
    
  </UForm>

  <div class="text-sm text-neutral-500">
    Not registered yet?
    <span
      class="text-blue-500 hover:underline"
      role="button"
      @click="$props.toggleLogin"
    >
      Sign up
    </span>
  </div>
</template>

