Cómo hacer un **pull desde su fork** (cuando el repositorio original —el *upstream*— tiene cambios y tú necesitas actualizarlos en tu copia).

---

````markdown
# 🧭 Actualizar tu fork con los últimos cambios del repositorio original

Cuando trabajas en un **fork**, estás trabajando en una **copia del repositorio original** (normalmente el de tu profesor/a o el del proyecto principal).  
Para mantener tu fork actualizado, necesitas hacer un **pull desde el upstream**.

---

## 🚀 Pasos para hacer un pull desde tu fork

### 1. Comprueba los remotos configurados
Abre la terminal en la carpeta del proyecto y escribe:

```bash
git remote -v
````

Deberías ver algo parecido a esto:

```
origin    https://github.com/TU_USUARIO/REPO.git (fetch)
origin    https://github.com/TU_USUARIO/REPO.git (push)
```

👉 Si **solo aparece `origin`**, significa que aún no has vinculado el repositorio original (el de clase o el del profesor/a).

---

### 2. Añade el remoto del repositorio original (upstream)

```bash
git remote add upstream https://github.com/PROFESOR/REPO_ORIGINAL.git
```

Ejemplo real:

```bash
git remote add upstream https://github.com/Amagozz/DI20252026.git
```

Comprueba que se ha añadido correctamente:

```bash
git remote -v
```

Ahora deberías ver:

```
origin    https://github.com/TU_USUARIO/REPO.git (fetch)
upstream  https://github.com/PROFESOR/REPO_ORIGINAL.git (fetch)
```

---

### 3. Descarga los cambios del repositorio original

```bash
git fetch upstream
```

Esto **trae** los cambios del repositorio del profesor, pero **no los mezcla todavía** con tu rama.

---

### 4. Fusión (merge) con tu rama local

Si estás trabajando en la rama `main` de tu fork:

```bash
git checkout main
git merge upstream/main
```

Esto mezcla los cambios nuevos del repo original en tu copia.

> 💡 Si aparece un conflicto, Git te avisará y deberás resolverlo antes de continuar.

---

### 5. Sube los cambios a tu fork en GitHub

```bash
git push origin main
```

Tu fork en GitHub quedará sincronizado con el repositorio original.

---

## 🧩 Resumen visual del flujo

```
[Repo original] ---> (fetch/merge) ---> [Tu fork local] ---> (push) ---> [Tu fork en GitHub]
```

---

## ⚙️ Opcional: actualizar una rama distinta

Si trabajas en una rama llamada, por ejemplo, `rama-alumno`:

```bash
git checkout rama-alumno
git merge upstream/main
git push origin rama-alumno
```

Así mantienes **tu rama actualizada** sin perder tus propios cambios.

---

## 🧼 Limpieza (solo si todo ha ido bien)

Si tu rama se desincronizó demasiado, puedes **reiniciar tu main** con la versión exacta del upstream:

```bash
git fetch upstream
git checkout main
git reset --hard upstream/main
git push origin main --force
```

> ⚠️ Este comando **sobrescribe** tu `main`. Úsalo solo si sabes lo que haces.

---

✳️ **Consejo final:**
Haz este proceso **una vez por semana o antes de empezar una práctica nueva**, para asegurarte de que trabajas con la versión más reciente del código de clase.

```

---

