<template>
  <div
    class="w-screen h-screen flex items-center bg-base-100 overflow-y-scroll"
  >
    <section
      class="container lg:p-10 p-5 m-auto grid grid-cols-1 lg:grid-cols-2 min-h-[50vh]"
    >
      <div
        class="text-primary-content bg-primary/60 rounded-box lg:p-10 p-5 flex flex-col justify-center"
      >
        <h1 class="lg:text-6xl text-4xl font-bold font-serif mb-5">
          Contact Us
        </h1>
        <p class="text-lg mb-5">
          This is a contact form using Odyssey's form components to create a
          contact form component. The contact form is setup to use Netlify's
          form detection; however, it can easily be translated to other popular
          form services such as Formspree, Getform, Formspark, etc.
        </p>
        <div class="grid lg:inline-block">
          <em>
            <a class="underline"> (800) 867-5309 </a>
          </em>
          •
          <em>
            <a class="underline"> hello@ourcompany.com </a>
          </em>
        </div>
      </div>

      <!-- form -->
      <div class="lg:px-10 lg:mt-0 mt-10">
        <form class="w-full grid gap-5">
          <div class="w-full flex flex-col">
            <label for="Name">Name</label>
            <input
              type="text"
              name="Name"
              placeholder="John Doe"
              class="input input-bordered mt-1"
            />
          </div>

          <div class="w-full flex flex-col">
            <label for="Email">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="hello@example.com"
              class="input input-bordered mt-1"
            />
          </div>

          <div class="w-full flex flex-col">
            <label>How Did You Hear About Us?</label>
            <select class="select select-bordered mt-1">
              <option value="" disabled>==SELECT AN OPTION==</option>
              <option value="Google Search">Google Search</option>
              <option value="Social Media">Social Media</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div class="w-full flex flex-col">
            <label for="Message" class="astro-2UVR42E5">Message</label>
            <textarea
              name="Message"
              placeholder="Your message here..."
              rows="4"
              class="textarea textarea-bordered mt-1"
            />
          </div>

          <div>
            <button class="btn btn-primary capitalize">Submit</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
