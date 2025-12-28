import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { profileInfo } from '@/types/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container-padding max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="font-display font-bold text-xl gradient-text inline-block mb-2">
              {profileInfo.name.split(' ')[0]}
              <span className="text-foreground">.</span>
            </a>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              © {currentYear} Made with <Heart className="w-4 h-4 text-primary" /> by {profileInfo.name}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={profileInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profileInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profileInfo.social.email}`}
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
