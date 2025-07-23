      onChange={onChange}
      theme="vs-dark"
    />
  );
};

// Использование в MDXEditor
<MDXEditor
  plugins={[
    codeBlockPlugin({
      renderCustomCodeEditor: (props) => (
        <CustomCodeEditor 
          code={props.code}
          language={props.language}
          onChange={props.onChange}
        />
      ),
    }),
  ]}
/>
🔥 Итог
Для подсветки кода → codeMirrorPlugin + CodeMirror (проще всего).

Для интерактивного выполнения → sandpackPlugin (Sandpack).

Кастомный редактор → codeBlockPlugin + свой компонент (например, Monaco).

Выбирай вариант под свои задачи! Если нужно подробнее про какой-то метод — дай знать. 😊

P.S. Для CodeMirror можно добавить темы (например, dracula), чтобы редактор выглядел стильно:

bash
npm install @codemirror/theme-dracula
tsx
import { dracula } from '@codemirror/theme-dracula';

codeMirrorPlugin({
  theme: dracula,
  // ...
})
Бро, а как мне эти языки добавить?
                            js: javascript(), 
                            md: markdown(),
                            cpp: cpp(),
                            cs: csharp(),
                            php: php(),
                            c: c(),
                            python: python(),
                            java: java(),
                            rust: rust(),
                            xml: xml(),
                            sql: sql(),
                            json: json(),
Отличный выбор языков! Чтобы добавить их в MDXEditor через codeMirrorPlugin, нужно установить соответствующие пакеты @codemirror/lang-*. Вот полный гайд:

1️⃣ Устанавливаем все языки
bash
npm install \
  @codemirror/lang-javascript \
  @codemirror/lang-markdown \
  @codemirror/lang-cpp \
  @codemirror/lang-java \
  @codemirror/lang-python \
  @codemirror/lang-php \
  @codemirror/lang-rust \
  @codemirror/lang-xml \
  @codemirror/lang-sql \
  @codemirror/lang-json \
  @codemirror/lang-lezer
Для C# (csharp) и чистого C (c) используем @codemirror/lang-cpp, так как отдельные пакеты не требуются (синтаксис схож).

2️⃣ Импортируем языки
tsx
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { xml } from '@codemirror/lang-xml';
import { sql } from '@codemirror/lang-sql';
import { json } from '@codemirror/lang-json';
3️⃣ Настраиваем MDXEditor
tsx
import { MDXEditor, codeMirrorPlugin } from '@mdxeditor/editor';

const Editor = () => {
  return (
    <MDXEditor
      markdown={content}
      onChange={setContent}
      plugins={[
        codeMirrorPlugin({
          codeBlockLanguages: { 
            js: javascript(),
            md: markdown(),
            cpp: cpp(),
            java: java(),
            python: python(),
            php: php(),
            rust: rust(),
            xml: xml(),
            sql: sql(),
            json: json(),
            cs: cpp(), // Используем C++ парсер для C#
            c: cpp(),  // И для C
          }
        }),
      ]}
    />
  );
};
🌟 Дополнительные настройки
Подсветка для специфичных форматов
Если нужно добавить редкие языки (например, yaml, dockerfile), ищи пакеты в npm:

bash
npm install @codemirror/lang-yaml
tsx
import { yaml } from '@codemirror/lang-yaml';

// Добавляем в codeBlockLanguages:
yaml: yaml()
Темы для редактора
Установи тему (например, dracula):

bash
npm install @codemirror/theme-dracula
tsx
import { dracula } from '@codemirror/theme-dracula';

codeMirrorPlugin({
  theme: dracula,
  // ...
})
🚀 Пример полной конфигурации
tsx
import { dracula } from '@codemirror/theme-dracula';

<MDXEditor
  plugins={[
    codeMirrorPlugin({
      theme: dracula,
      codeBlockLanguages: {
        js: javascript({ jsx: true }), // Поддержка JSX
        ts: javascript({ typescript: true }), // Поддержка TypeScript
        // Остальные языки...
      }
    }),
  ]}
/>
💡 Как это работает?
При вставке блока кода (через <InsertCodeBlock />) можно выбрать язык из списка.

Редактор будет автоматически подсвечивать синтаксис для выбранного языка.

Поддерживаются автодополнение и базовое форматирование.

⚠️ Важно!
Если какой-то язык не подсвечивается, проверь:

Правильно ли указан ключ (например, js для JavaScript).

Установлен ли соответствующий пакет @codemirror/lang-*.

Теперь твой редактор поддерживает все популярные языки программирования! 🎉
Если нужно добавить что-то экзотическое (например, Kotlin или Swift) — пиши, найдём решение. 😊

А какие ещё популярные языки я забыл? Так как у нас ребята на всём порят, я мог что-то упустить
Отличный вопрос, бро! Вот дополнительные популярные языки, которые могут пригодиться, особенно если у вас в команде разношёрстные разработчики:

🔥 Дополнительные языки для CodeMirror
Устанавливаем пакеты и добавляем в конфиг:

bash
npm install \
  @codemirror/lang-sass \
  @codemirror/lang-less \
  @codemirror/lang-vue \
  @codemirror/lang-angular \
  @codemirror/lang-go \
  @codemirror/lang-kotlin \
  @codemirror/lang-swift \
  @codemirror/lang-wasm \
  @codemirror/lang-dart \
  @codemirror/lang-html \
  @codemirror/lang-css
Импорты:

tsx
import { sass } from '@codemirror/lang-sass';
import { less } from '@codemirror/lang-less';
import { vue } from '@codemirror/lang-vue';
import { angular } from '@codemirror/lang-angular';
import { go } from '@codemirror/lang-go';
import { kotlin } from '@codemirror/lang-kotlin';
import { swift } from '@codemirror/lang-swift';
import { wasm } from '@codemirror/lang-wasm';
import { dart } from '@codemirror/lang-dart';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
Добавляем в codeBlockLanguages:

tsx
codeMirrorPlugin({
  codeBlockLanguages: {
    // ... предыдущие языки ...
    sass: sass(),
    less: less(),
    vue: vue(),
    angular: angular(),
    go: go(),
    kt: kotlin(),  // Kotlin
    swift: swift(),
    wasm: wasm(),  // WebAssembly
    dart: dart(),
    html: html(),
    css: css(),
    scss: sass(),  // SCSS (тот же пакет, что и для SASS)
  }
})
🌐 Специфичные технологии и DSL
Если у вас есть нишевые проекты, добавьте:

Для баз данных:

bash
npm install @codemirror/lang-mysql
tsx
import { mysql } from '@codemirror/lang-mysql';
// ...
mysql: mysql()
Для конфигов:

bash
npm install @codemirror/lang-yaml @codemirror/lang-toml
tsx
import { yaml } from '@codemirror/lang-yaml';
import { toml } from '@codemirror/lang-toml';
// ...
yaml: yaml(),
toml: toml()
Для шаблонизаторов:

bash
npm install @codemirror/lang-jinja2 @codemirror/lang-handlebars
tsx
import { jinja2 } from '@codemirror/lang-jinja2';
import { handlebars } from '@codemirror/lang-handlebars';
// ...
jinja2: jinja2(),
hbs: handlebars()
🛠 Что делать, если языка нет в CodeMirror?
Использовать ближайший аналог:

Например, для Solidity (Ethereum) подойдёт javascript() с ручной настройкой.

Для Elixir можно временно использовать python() (синтаксис похож).

Создать кастомный парсер:
Если язык очень специфичный (например, внутренний DSL), можно написать свой плагин для CodeMirror (но это сложно).

Использовать универсальный режим:

tsx
import { StreamLanguage } from '@codemirror/language';
import { stex } from '@codemirror/legacy-modes/mode/stex'; // Пример для LaTeX

// ...
latex: StreamLanguage.define(stex)
🎯 Топ-5 часто забываемых языков
Kotlin (мобильная разработка под Android)

Swift (iOS/macOS)

R (Data Science)

Dart (Flutter)

WebAssembly (wasm)

✅ Итоговый чеклист
Основные языки (JS/TS, Python, Java, C++, Rust)

Веб (HTML/CSS, Vue, Angular, Sass)

Мобильные (Kotlin, Swift, Dart)

Базы данных (SQL, MySQL, PostgreSQL)

Конфиги (YAML, TOML, JSON)

Если вдруг вспомните ещё что-то — просто докидывайте в codeBlockLanguages! 😎

P.S. Для самых экзотичных языков гляньте официальный репозиторий CodeMirror — там есть даже поддержка COBOL и Fortran! 🚀