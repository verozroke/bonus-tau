<template>
  <div class="faq-body">
    <div class="faq-body__title mb-10">FAQ</div>
    <div class="faq-body__list">
      <v-expansion-panels>
        <v-expansion-panel
          class="faq-body__question"
          v-for="item in questions"
          :key="item.id"
        >
          <v-expansion-panel-title
            style="
              font-size: 24px;
              font-weight: bold;
              padding: 25px 16px;
              background-color: #f1f5f9;
            "
            >{{ item.question }}</v-expansion-panel-title
          >
          <v-expansion-panel-text
            style="padding: 20px 20px 10px 20px; font-size: 18px; background-color: #f1f5f9"
          >
            <span><b>Ответ:</b></span> <br />
            <br />
            {{ item.answer }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '~/core/types/question'

const questions = ref<Question[]>([
  {
    id: 1,
    question: 'Какие банки предлагают кэшбэк?',
    answer:
      'Список банков, предоставляющих кэшбэк, может варьироваться в зависимости от условий и региона. Однако, некоторые известные банки, предлагающие кэшбэк, включают Сбербанк, Альфа-Банк, Тинькофф и другие.'
  },
  {
    id: 2,
    question: 'Как работает система кэшбэк?',
    answer:
      'Кэшбэк - это программа вознаграждения, которая позволяет пользователям получать часть потраченных средств обратно на свой счет. Пользователи могут зарабатывать кэшбэк путем совершения покупок с использованием кредитных или дебетовых карт, связанных с программой кэшбэк.'
  },
  {
    id: 3,
    question: 'Как узнать о доступных кэшбэк предложениях?',
    answer:
      'Чтобы узнать о доступных кэшбэк предложениях, можно использовать специальные сервисы и приложения, которые собирают информацию о текущих акциях и предложениях от различных банков и платежных систем.'
  }
])
useHead({
  title: 'FAQ | Bonastau'
})
</script>

<style lang="scss" scoped>
.faq-body {
  font-family: 'Overpass', sans-serif;
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f1f4f9;

  &__title {
    font-size: 64px;
    font-weight: 500;
    line-height: 1.4em;
  }

  &__subtitle {
    color: #71717a;
    font-size: 18px;
    width: 70%;
    text-align: center;
  }

  &__row {
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }

  &__object-count {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.4em;
    margin-bottom: 10px;
  }

  &__question {
  }
}

@media only screen and (max-width: 789px) {
  .faq-body {
    padding: 50px 10px;

    &__title {
      font-size: 48px;
    }

    &__object-count {
      font-size: 24px;
    }
  }
}

@media only screen and (max-width: 544px) {
  .faq-body {
    padding: 50px 10px;

    &__title {
      font-size: 32px;
    }

    &__object-count {
      font-size: 16px;
    }
  }
}
</style>
