import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    programa: [
      { label: 'Acerca de', path: '/about' },
      { label: 'Cursos', path: '/courses' },
      { label: 'Metodología', path: '/methodology' },
      { label: 'Certificación', path: '/certification' }
    ],
    recursos: [
      { label: 'Blog', path: '/blog' },
      { label: 'Guías', path: '/guides' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Soporte', path: '/support' }
    ],
    comunidad: [
      { label: 'Foro', path: '/forum' },
      { label: 'Eventos', path: '/events' },
      { label: 'Testimonios', path: '/testimonials' },
      { label: 'Partners', path: '/partners' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral-dark to-black py-12 sm:py-16 border-t border-neutral-light/10">
      <div className="container text-center mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* University Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold gradient-text-gold mb-4">Universidad del Sinú</h3>
              <p className="text-xl text-primary-gold mb-2">Seccional Cartagena</p>
              <p className="text-neutral-light/70 mb-6">
                Programa de Gastronomía Sostenible<br />
                Facultad de Ciencias e Ingenierías<br />
                Innovación y Sostenibilidad Culinaria
              </p>
              
              {/* Social Media */}
              <div className="flex justify-center space-x-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-gold/20 to-accent-blue/20 
                             flex items-center justify-center hover:from-primary-gold/40 hover:to-accent-blue/40 
                             transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <span className="text-neutral-light group-hover:text-primary-gold transition-colors">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Badges */}
              <div className="flex justify-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary-gold to-orange-500 rounded-full 
                           flex items-center justify-center shadow-glow-gold"
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 bg-gradient-to-br from-accent-blue to-blue-600 rounded-full 
                           flex items-center justify-center shadow-glow-blue"
                >
                  <Award className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold  text-lg mb-4 text-neutral-light">Programa</h4>
              <ul className="space-y-2">
                {footerLinks.programa.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-neutral-light/70 hover:text-primary-gold transition-colors 
                               flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary-gold rounded-full opacity-0 
                                     group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-4 text-neutral-light">Recursos</h4>
              <ul className="space-y-2">
                {footerLinks.recursos.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-neutral-light/70 hover:text-primary-gold transition-colors 
                               flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary-gold rounded-full opacity-0 
                                     group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold text-lg mb-4 text-neutral-light">Contacto</h4>
              <ul className="space-y-3 text-neutral-light/70">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary-gold mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:+5756517722" className="hover:text-primary-gold transition-colors">
                      +57 (5) 651 7722
                    </a>
                    <p className="text-sm">Ext: 1234</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary-gold mt-1 flex-shrink-0" />
                  <a
                    href="mailto:gastronomia@unisinucartagena.edu.co"
                    className="hover:text-primary-gold transition-colors break-all"
                  >
                    gastronomia@unisinucartagena.edu.co
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary-gold mt-1 flex-shrink-0" />
                  <address className="not-italic">
                    Santillana, Transversal 54<br />
                    No. 30-729<br />
                    Cartagena de Indias<br />
                    Bolívar, Colombia
                  </address>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        

        {/* Bottom Bar */}
        <div className="border-t border-neutral-light/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-neutral-light/60 text-center md:text-left"
            >
              <p>© {currentYear} Universidad del Sinú - Seccional Cartagena. Todos los derechos reservados.</p>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm"
            >
              <Link to="/privacy" className="text-neutral-light/60 hover:text-primary-gold transition-colors">
                Políticas de Privacidad
              </Link>
              <Link to="/terms" className="text-neutral-light/60 hover:text-primary-gold transition-colors">
                Términos de Uso
              </Link>
              <Link to="/sitemap" className="text-neutral-light/60 hover:text-primary-gold transition-colors">
                Mapa del Sitio
              </Link>
              <a 
                href="https://unisinu.edu.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-light/60 hover:text-primary-gold transition-colors flex items-center gap-1"
              >
                Portal Universitario
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-xs sm:text-sm text-neutral-light/40 flex items-center justify-center gap-2">
              Desarrollado  por EcoAceite - Plataforma de Educación en Sostenibilidad Gastronómica
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

