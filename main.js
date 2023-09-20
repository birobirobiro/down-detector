
async function getData() {

  const base_url = "/api/v2/summary.json"

  const websites = [
    {
      name: "Notion",
      url: `https://status.notion.so/${base_url}`
    },
    {
      name: "GitHub",
      url: `https://www.githubstatus.com${base_url}`
    },
    {
      name: "Discord",
      url: `https://discordstatus.com${base_url}`
    },
    {
      name: "Vercel",
      url: `https://www.vercel-status.com${base_url}`
    },
    {
      name: "Jira",
      url: `https://jira-software.status.atlassian.com/${base_url}`
    },
    {
      name: "Panda Vídeo",
      url: `https://status.pandavideo.com${base_url}`
    },
  ];
  const data = await Promise.all(websites.map(async (website) => {
    const response = await fetch(website.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${website.name}`);
    }
    return { name: website.name, data: await response.json() };
  }));

  return data;
}

async function displayData() {
  try {
    const data = await getData();
    const statusContainer = document.getElementById('status-container');

    data.forEach((serviceData) => {
      const serviceName = serviceData.name;
      const serviceDiv = document.createElement('div');
      serviceDiv.classList.add('service');

      const serviceHeader = document.createElement('h2');
      serviceHeader.textContent = serviceName;
      serviceDiv.appendChild(serviceHeader);

      serviceData.data.components.forEach((component) => {
        const componentDiv = document.createElement('div');
        componentDiv.classList.add('component');
        const statusClass = component.status.toLowerCase();
        componentDiv.classList.add(statusClass);

        const componentName = component.name;
        const componentStatus = component.status;

        componentDiv.textContent = `${componentName} - ${componentStatus}`;
        serviceDiv.appendChild(componentDiv);
      });

      statusContainer.appendChild(serviceDiv);
    });
  } catch (error) {
    console.error(error.message);
  }
}

displayData();