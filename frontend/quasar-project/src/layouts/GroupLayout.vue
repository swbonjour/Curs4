<template>
  <div class="group">
    <div
      v-if="groupRef.option.value === GroupOption.QUIZ"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4rem;
      "
    >
      <div style="margin-top: 10rem; cursor: pointer" @click="scrollLeft">
        <q-icon name="arrow_back" size="32px"></q-icon>
      </div>
      <div v-if="itemIndex !== quiz.length" style="width: 100%">
        <div v-for="(item, index) in quiz" :key="item._id" style="width: 100%">
          <div class="quiz-item-question" v-if="itemIndex === index">
            <q-icon
              name="close"
              size="22px"
              class="quiz-delete"
              @click="deleteQuiz(item._id)"
              v-if="userStore.is_teacher"
            ></q-icon>
            <h4>{{ item.question }}</h4>
            <div>
              <ul style="display: flex; gap: 4rem">
                <li
                  style="cursor: pointer"
                  @click="
                    sendCorrectAnswer(
                      item._id,
                      item.answers[0],
                      item.correct_answer,
                      item.score
                    )
                  "
                >
                  {{ item.answers[0] }}
                </li>
                <li
                  style="cursor: pointer"
                  @click="
                    sendCorrectAnswer(
                      item._id,
                      item.answers[1],
                      item.correct_answer,
                      item.score
                    )
                  "
                >
                  {{ item.answers[1] }}
                </li>
                <li
                  style="cursor: pointer"
                  @click="
                    sendCorrectAnswer(
                      item._id,
                      item.answers[2],
                      item.correct_answer,
                      item.score
                    )
                  "
                >
                  {{ item.answers[2] }}
                </li>
                <li
                  style="cursor: pointer"
                  @click="
                    sendCorrectAnswer(
                      item._id,
                      item.answers[3],
                      item.correct_answer,
                      item.score
                    )
                  "
                >
                  {{ item.answers[3] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        class="quiz-item"
        style="cursor: pointer; width: 100%"
        @click="addQuiz = true"
        v-if="itemIndex === quiz.length && userStore.is_teacher"
      >
        <q-icon name="add" size="32px" color="grey"></q-icon>
      </div>
      <div style="margin-top: 10rem; cursor: pointer" @click="scrollRight">
        <q-icon name="arrow_forward" size="32px"></q-icon>
      </div>
    </div>
    <div
      v-if="groupRef.option.value === GroupOption.USERS"
      style="display: flex; align-items: center; gap: 1rem"
    >
      <div v-for="item in users" :key="item._id">
        <div class="user-item">
          <q-icon name="close" size="22px" class="user-delete" @click="deleteUser(item._id)"></q-icon>
          <h4>{{ item.username }}</h4>
          <h5>Score: {{ item.score }}</h5>
        </div>
      </div>
      <div
        class="user-item-add"
        @click="
          async () => {
            addUser = true;
            await getUsersNotInSpace();
          }
        "
      >
        <q-icon name="add" size="32px" color="grey"></q-icon>
      </div>
    </div>
    <div
      v-if="groupRef.option.value === GroupOption.LISTENING"
      style="margin-top: 8rem"
    >
      <q-input v-model="speechText" label="Text"></q-input>
      <div
        style="
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        "
      >
        <q-btn color="white" @click="speechSynthesis(speechText)">
          <q-icon name="play_circle" color="grey"></q-icon>
        </q-btn>
        <q-btn color="white" @click="speechStop">
          <q-icon name="pause_circle" color="grey"></q-icon>
        </q-btn>
      </div>
      <div style="margin-top: 2rem; display: flex; gap: 2rem">
        <q-select
          v-model="selectedVoice"
          :options="voiceOptions"
          style="width: 10rem"
          label="Select Voice"
        ></q-select>
        <div style="display: flex; flex-direction: column; padding-top: 1.5rem">
          <q-badge style="width: 4rem; display: flex; justify-content: center"
            >Pitch: {{ voicePitch }}</q-badge
          >
          <q-slider
            v-model="voicePitch"
            style="width: 10rem"
            :min="0"
            :max="2"
            :step="0.1"
          ></q-slider>
        </div>
        <div style="display: flex; flex-direction: column; padding-top: 1.5rem">
          <q-badge style="width: 4rem; display: flex; justify-content: center"
            >Ratio: {{ voiceRatio }}</q-badge
          >
          <q-slider
            v-model="voiceRatio"
            style="width: 10rem"
            :min="0"
            :max="2"
            :step="0.1"
          ></q-slider>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="addQuiz" persistent>
    <q-card style="width: 30rem; padding: 2rem">
      <q-card-section class="row items-center">
        <h4>Create new quiz</h4>
        <q-space></q-space>
        <q-btn
          icon="close"
          size="22px"
          flat
          style="cursor: pointer"
          v-close-popup
          @click="clearInput"
        ></q-btn>
      </q-card-section>
      <q-card-section>
        <q-input v-model="quizQuestion" label="Quiz question"></q-input>
        <h5 style="padding-top: 1rem">Answers</h5>
        <q-input v-model="answerFirst" label="Answer first"></q-input>
        <q-input v-model="answerSecond" label="Answer second"></q-input>
        <q-input v-model="answerThird" label="Answer third"></q-input>
        <q-input v-model="answerFourth" label="Answer fourth"></q-input>
        <h5 style="padding-top: 1rem">Correct answer</h5>
        <q-input v-model="correctAnswer" label="Correct answer"></q-input>
        <h5 style="padding-top: 1rem">Score</h5>
        <q-input v-model="score" label="Score"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn
          flat
          label="Create"
          v-close-popup
          style="margin-left: 18rem"
          @click="createQuiz"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="addUser" persistent>
    <q-card style="width: 30rem; padding: 2rem">
      <q-card-section class="row items-center">
        <h4>Add new user</h4>
        <q-space></q-space>
        <q-btn
          icon="close"
          size="22px"
          flat
          style="cursor: pointer"
          v-close-popup
          @click="clearInput"
        ></q-btn>
      </q-card-section>
      <q-card-section
        v-for="item in usersNotInSpace"
        :key="item._id"
        @click="addUserToGroup(item._id)"
        style="cursor: pointer; border-bottom: 1px solid black"
      >
        <h5>Username: {{ item.username }}</h5>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ApiClient } from 'src/api';
import { User } from 'src/api/client';
import { GroupOption, useGroupStore } from 'src/stores/group';
import { useUserStore } from 'src/stores/user';
import { QuizDto } from 'src/types/quiz';
import { UserDto } from 'src/types/user';
import { onMounted, ref, watch } from 'vue';

const groupStore = useGroupStore();

const userStore = useUserStore();

const groupRef = storeToRefs(groupStore);

watch(groupRef.option, () => {
  console.log(groupRef.option.value);
});

const quiz = ref<QuizDto[]>([]);

const addQuiz = ref(false);

const itemIndex = ref(0);

const clearInput = () => {
  console.log(1);
};

const scrollLeft = () => {
  if (itemIndex.value - 1 < 0) {
    return;
  }
  itemIndex.value -= 1;
};

const scrollRight = () => {
  if (!userStore.is_teacher) {
    if (itemIndex.value + 1 > quiz.value.length - 1) {
      return;
    }
  }

  if (itemIndex.value + 1 > quiz.value.length) {
    return;
  }
  itemIndex.value += 1;
};

const createQuiz = async () => {
  await ApiClient.quizControllerAddQuestionToGroup({
    question: quizQuestion.value,
    answers: [
      answerFirst.value,
      answerSecond.value,
      answerThird.value,
      answerFourth.value,
    ],
    correct_answer: correctAnswer.value,
    score: score.value,
    group: groupStore.group_id,
    user_id: userStore._id,
  }).then((res: any) => {
    quiz.value.push(res);
  });
};

const quizQuestion = ref('');

const answerFirst = ref('');
const answerSecond = ref('');
const answerThird = ref('');
const answerFourth = ref('');

const correctAnswer = ref('');

const score = ref(1);

const users = ref<UserDto[]>([]);

const allowedUsers = ref<{ allowed_users: string[] }>({ allowed_users: [] });

const addUser = ref(false);

const usersNotInSpace = ref<UserDto[]>([]);

const getUsersNotInSpace = async () => {
  await ApiClient.userControllerGetUsersNotInSpace({
    group_id: groupStore.group_id,
  }).then((res: any) => {
    usersNotInSpace.value = res;
  });
};

const addUserToGroup = async (user_id: string) => {
  await ApiClient.groupControllerAddUserToGroup({
    group_id: groupStore.group_id,
    user_id: user_id,
  }).then((res: any) => {
    users.value.push(res);
  });

  addUser.value = false;
};

const sendCorrectAnswer = async (
  quizId: string,
  answer: string,
  correct_answer: string,
  score: number
) => {
  if (answer === correct_answer) {
    await ApiClient.quizControllerSendCorrectAnswer({
      id: quizId,
      user_id: userStore._id,
    });
    userStore.addScore({ score: Number(score) });
  }
};

const speechText = ref('');

const synth = window.speechSynthesis;

const selectedVoice = ref('Man 1 - English');

const voicePitch = ref(1);

const voiceRatio = ref(1)

const voiceOptions = [
  'Woman 1 - Russian',
  'Man 1 - English',
  'Woman 2 - English',
  'Man 2 - Russian',
];

const speechSynthesis = (text: string) => {
  const utterThis = new SpeechSynthesisUtterance(text);

  const voices = synth.getVoices();

  switch (selectedVoice.value) {
    case 'Man 1 - English':
      utterThis.voice = voices[1];
      break;
    case 'Man 2 - Russian':
      utterThis.voice = voices[4];
      break;
    case 'Woman 1 - Russian':
      utterThis.voice = voices[0];
      break;
    case 'Woman 2 - English':
      utterThis.voice = voices[2];
      break;
  }

  utterThis.pitch = voicePitch.value;
  utterThis.rate = voiceRatio.value;

  synth.speak(utterThis);
};

const speechStop = () => {
  synth.cancel();
}

const deleteQuiz = async (quiz_id: string) => {
  await ApiClient.quizControllerDeleteQuestionFromGroup({ id: quiz_id });
  quiz.value = quiz.value.filter((item) => item._id !== quiz_id);
};

const deleteUser = async (user_id: string) => {
  await ApiClient.groupControllerDeleteUserFromGroup({
    user_id: user_id,
    group_id: groupStore.group_id,
  });

  users.value = users.value.filter((item) => item._id !== user_id)
};

onMounted(async () => {
  await ApiClient.quizControllerGetQuestionsForGroup({
    group: groupStore.group_id,
  }).then((res: any) => {
    quiz.value = res;
  });

  await ApiClient.groupControllerGetAllowedUsers({
    group_id: groupStore.group_id,
  }).then(async (res: any) => {
    allowedUsers.value = res;
    await ApiClient.userControllerGetUsersById({
      _id: encodeURIComponent(JSON.stringify(allowedUsers.value.allowed_users)),
    }).then((res: any) => {
      users.value = res;
    });
  });
});
</script>
<style scoped>
.group {
  width: 50rem;
  height: 48rem;
}

.quiz-item {
  height: 20rem;
  border: 1px solid black;
  margin-top: 10rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quiz-item-question {
  height: 20rem;
  border: 1px solid black;
  margin-top: 10rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.user-item {
  width: 10rem;
  height: 8rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
  position: relative;
}

.user-item-add {
  width: 10rem;
  height: 8rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.quiz-delete {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  transition: all 0.1s;
}

.quiz-delete:hover {
  color: red;
}

.user-delete {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  transition: all 0.1s;
}

.user-delete:hover {
  color: red;
}
</style>
