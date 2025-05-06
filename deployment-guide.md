# Deployment Guide for SystemStatus on DigitalOcean

This guide provides step-by-step instructions for deploying the SystemStatus application to DigitalOcean using Docker and Docker Compose.

## Prerequisites

- [DigitalOcean](https://www.digitalocean.com/) account
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your local machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your local machine
- [Git](https://git-scm.com/downloads) installed on your local machine

## Step 1: Create a DigitalOcean Droplet

1. Log in to your DigitalOcean account
2. Click "Create" and select "Droplet"
3. Choose an image: Select the "Marketplace" tab and search for "Docker"
4. Select the "Docker on Ubuntu" image
5. Choose a plan: Recommended Basic Plan with at least 2GB RAM
6. Choose a datacenter region close to your target audience
7. Authentication: Add your SSH keys (recommended) or choose a password
8. Click "Create Droplet"

## Step 2: Connect to Your Droplet

Once your Droplet is created, connect to it using SSH:

```bash
ssh root@your_droplet_ip
```

Replace `your_droplet_ip` with the IP address of your DigitalOcean Droplet.

## Step 3: Upload Project Files to the Droplet

You have two options:

### Option 1: Clone from Git Repository (Recommended)

If your project is in a Git repository:

```bash
# On your Droplet
git clone your_repository_url
cd your_repository_name
```

### Option 2: Use SCP to Transfer Files

If your project is local:

```bash
# On your local machine
scp -r /path/to/your/project root@your_droplet_ip:/root/systemstatus
```

## Step 4: Build and Run with Docker Compose

Navigate to your project directory on the Droplet and run:

```bash
cd /root/systemstatus  # Or your project directory
docker-compose up -d --build
```

This will build your Docker image and start the container in detached mode.

## Step 5: Configure Firewall (Optional but Recommended)

DigitalOcean provides a firewall service to secure your Droplet:

1. In the DigitalOcean Control Panel, go to "Networking" > "Firewalls"
2. Click "Create Firewall"
3. Add the following inbound rules:
   - HTTP (Port 80) - Allow from anywhere
   - HTTPS (Port 443) - Allow from anywhere
   - SSH (Port 22) - Allow from your IP or restrict as needed
4. Add your Droplet to the firewall
5. Click "Create Firewall"

## Step 6: Setup a Domain Name (Optional)

If you have a domain name:

1. In the DigitalOcean Control Panel, go to "Networking" > "Domains"
2. Add your domain and create an A record pointing to your Droplet's IP address

## Step 7: Configure SSL with Let's Encrypt (Optional)

If you've set up a domain name, you can add SSL:

```bash
# Install Certbot
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obtain SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the Certbot prompts to complete the SSL configuration.

## Step 8: Monitor Your Application

You can monitor the logs of your running containers:

```bash
docker-compose logs -f
```

## Troubleshooting

### Container is not running

Check the status of your containers:

```bash
docker-compose ps
```

If the container is not running, check the logs:

```bash
docker-compose logs
```

### Website is not accessible

Verify that your DigitalOcean firewall and Droplet firewall allow traffic on port 80:

```bash
ufw status
```

If the port is not open, allow it:

```bash
ufw allow 80/tcp
```

## Updating Your Application

To update your application:

1. Pull the latest changes (if using Git):
   ```bash
   git pull
   ```

2. Rebuild and restart the containers:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

## Backing Up Your Droplet

DigitalOcean provides snapshots for backups:

1. In the DigitalOcean Control Panel, select your Droplet
2. Click on "Snapshots" in the left sidebar
3. Click "Take Snapshot"

You can restore from a snapshot if needed.

## Conclusion

Your SystemStatus application should now be deployed on DigitalOcean and accessible via your Droplet's IP address or your configured domain name.

For production environments, consider setting up:
- Regular backups
- Monitoring and alerts
- Automated deployments
- Load balancing for high traffic applications