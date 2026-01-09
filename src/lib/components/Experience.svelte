<script lang="ts">
  let { id = 'experience' }: { id?: string } = $props();
  
  const experiences = [
    {
      company: 'Susquehanna International Group',
      location: 'Bala Cynwyd, PA',
      position: 'Software Engineer Co-op',
      team: 'Team Order Routing and Quoting (TORQ)',
      period: 'September 2023 - March 2024',
      responsibilities: [
        'Developed a C++ protocol metrics publisher to tail multiple log files to generate data frames for 5.8 billion+ messages/day',
        'Built a Python orchestration layer with C++ bindings to aggregate metric data-frames and stream real-time data on Grafana',
        'Created a Python FastAPI proxy server to integrate OpenTelemetry alerts with an internal messaging platform via RESTful API',
        'Developed a concurrent Python Kafka consumer to process 500+ million messages in 5 minutes, increasing speed by 9x'
      ],
      technologies: [
        'C++',
        'Python',
        'Kafka',
        'FastAPI',
        'Kubernetes',
        'GitLab CI/CD',
        'Grafana',
        'RESTful API'
      ]
    },
    {
      company: 'OPEX Corporation',
      location: 'Moorestown, NJ',
      position: 'Software Engineer Co-op',
      team: 'Warehouse Automation and Robotics',
      period: 'September 2022 - March 2023',
      responsibilities: [
        'Implemented asynchronous windows inter-process communication, connecting multiple C++ applications with proprietary protocol, reducing alert latency by 60%',
        'Developed a Python tool using Doxygen to integrate 15,000+ dynamic Windows Help files into a C++ MFC application',
        'Wrote comprehensive unit and integration tests for robot\'s host application, increasing test coverage and operational reliability'
      ],
      technologies: ['C++', 'Python', 'Windows IPC', 'Doxygen', 'Robotics']
    },
    {
      company: 'Drexel University',
      location: 'Philadelphia, PA',
      position: 'Teaching Assistant',
      team: 'College of Computing & Informatics',
      period: 'September 2022 - March 2025',
      responsibilities: [
        'Mentored over 150 students during weekly labs and tutoring hours, helping them grasp complex concepts',
        'Developed grading tool with Python and JavaScript to automate assignment compilation, reducing grading time by 80%'
      ],
      technologies: ['Python', 'JavaScript', 'Mentoring', 'Plugin Architecture']
    }
  ];
</script>

<section {id} data-project-section={id} class="scroll-mt-32 mb-20 pb-20 border-b border-border/20">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
    <div class="lg:col-span-4">
      <div class="text-xs uppercase tracking-widest text-muted-foreground mb-2">Experience</div>
      <h2 class="text-3xl lg:text-4xl font-semibold mb-6 text-foreground" style="font-family: 'Playfair Display', serif;">
        Work & Leadership
      </h2>
    </div>
    
    <div class="lg:col-span-8 space-y-8">
      {#each experiences as experience}
        <div class="space-y-3">
          <div>
            <h3 class="text-xl font-semibold text-foreground mb-1">{experience.position}</h3>
            <p class="text-base font-medium text-foreground/90">{experience.company}</p>
            <p class="text-sm text-foreground/70">{experience.location} • {experience.period}</p>
            {#if experience.team}
              <p class="text-sm text-foreground/60 italic">{experience.team}</p>
            {/if}
          </div>
          <ul class="space-y-2 text-foreground leading-relaxed text-base list-disc pl-6">
            {#each experience.responsibilities as responsibility}
              <li>{responsibility}</li>
            {/each}
          </ul>
          {#if experience.technologies && experience.technologies.length > 0}
            <div class="flex flex-wrap gap-2 pt-2">
              {#each experience.technologies as tech}
                <span class="px-3 py-1 text-xs bg-accent/30 text-foreground rounded-full border border-border/50">
                  {tech}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
