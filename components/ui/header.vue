<template>
  <header>
    <div class="h-14 bg-white w-full flex justify-end items-center">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clip-path="url(#clip0_1716_17081)">
            <rect width="24" height="24" rx="12" fill="#F3F4F6"/>
            <path d="M24 20.994V24.001H0V21.005C1.39595 19.1395 3.20791 17.6253 5.29179 16.5831C7.37567 15.5408 9.67399 14.9991 12.004 15.001C16.908 15.001 21.264 17.355 24 20.994ZM16.002 9C16.002 10.0609 15.5806 11.0783 14.8304 11.8284C14.0803 12.5786 13.0629 13 12.002 13C10.9411 13 9.92372 12.5786 9.17357 11.8284C8.42343 11.0783 8.002 10.0609 8.002 9C8.002 7.93913 8.42343 6.92172 9.17357 6.17157C9.92372 5.42143 10.9411 5 12.002 5C13.0629 5 14.0803 5.42143 14.8304 6.17157C15.5806 6.92172 16.002 7.93913 16.002 9Z" fill="#D1D5DB"/>
          </g>
          <defs>
            <clipPath id="clip0_1716_17081">
              <rect width="24" height="24" rx="12" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="pl-4 pr-8 py-3 text-[#475569]">
        <p>{{$auth.user.first_name}} {{$auth.user.last_name}} {{$auth.user.middle_name}}</p>
      </div>
    </div>
  </header>
</template>
<script>

</script>
