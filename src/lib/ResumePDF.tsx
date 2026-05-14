import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff',
      fontWeight: 700,
    },
  ],
});

const COLORS = {
  primary: '#C19A6B',
  primaryDark: '#A88152',
  foreground: '#4A3B32',
  textMuted: '#8C7A6B',
  textDark: '#635245',
  border: '#E8DDD3',
  background: '#FDFBF7',
  white: '#FFFFFF',
  sectionBg: '#FBF7F4',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: COLORS.white,
    paddingTop: 0,
    paddingBottom: 40,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 10,
    color: COLORS.foreground,
  },

  // Header strip
  header: {
    backgroundColor: COLORS.primary,
    padding: '36 40 28 40',
  },
  headerName: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.white,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 16,
    fontFamily: 'Helvetica',
  },
  headerMeta: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  headerMetaItem: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
  },

  // Body layout
  body: {
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 28,
    gap: 18,
  },

  // Left column (narrower)
  leftCol: {
    width: '34%',
    flexDirection: 'column',
    gap: 16,
  },

  // Right column
  rightCol: {
    width: '66%',
    flexDirection: 'column',
    gap: 16,
  },

  // Section
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.primary,
    borderBottom: `1.5px solid ${COLORS.primary}`,
    paddingBottom: 4,
    marginBottom: 10,
  },

  // Skills
  skillCategory: {
    marginBottom: 10,
  },
  skillCategoryName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.textDark,
    marginBottom: 5,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    gap: 5,
  },
  skillDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  skillText: {
    fontSize: 9,
    color: COLORS.textMuted,
  },

  // About
  profileWrap: {
    alignItems: 'center',
    marginBottom: 6,
  },
  profileImage: {
    width: 100,
    height: 128,
    objectFit: 'cover',
    borderRadius: 6,
    border: `1px solid ${COLORS.border}`,
  },
  aboutText: {
    fontSize: 9,
    color: COLORS.textMuted,
    lineHeight: 1.5,
  },

  // Contact
  contactItem: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  contactLabel: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.textDark,
    width: 40,
  },
  contactValue: {
    fontSize: 8.5,
    color: COLORS.textMuted,
    flex: 1,
  },

  // Experience
  expItem: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  expItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: 'none',
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  expTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.foreground,
  },
  expPeriod: {
    fontSize: 8.5,
    color: COLORS.primary,
    fontFamily: 'Helvetica-Bold',
  },
  expCompany: {
    fontSize: 9.5,
    color: COLORS.primary,
    marginBottom: 5,
  },
  expDescription: {
    fontSize: 9,
    color: COLORS.textMuted,
    lineHeight: 1.6,
  },
  projectItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.foreground,
    marginBottom: 4,
  },
  projectRole: {
    fontSize: 9,
    color: COLORS.primary,
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  projectDescription: {
    fontSize: 9,
    color: COLORS.textMuted,
    lineHeight: 1.55,
  },

  // Education / other
  eduItem: {
    marginBottom: 10,
  },
  eduTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.foreground,
    marginBottom: 1,
  },
  eduSub: {
    fontSize: 9,
    color: COLORS.textMuted,
  },

  // Divider
  divider: {
    borderBottom: `1px solid ${COLORS.border}`,
    marginBottom: 10,
  },
});

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone?: string;
  birthDate?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  profileImage?: string;
  about: string;
  mainProject?: { name: string; role: string; description: string };
  skills: { category: string; items: string[] }[];
  experience: { title: string; company: string; period: string; description: string }[];
  education?: { degree: string; school: string; year: string }[];
}

export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document
      title={`${data.name} — Resume`}
      author={data.name}
      creator="Portfolio CMS"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.name}</Text>
          <Text style={styles.headerTitle}>{data.title}</Text>
          <View style={styles.headerMeta}>
            {data.email && <Text style={styles.headerMetaItem}>✉ {data.email}</Text>}
            {data.phone && <Text style={styles.headerMetaItem}>☎ {data.phone}</Text>}
            {data.birthDate && <Text style={styles.headerMetaItem}>DOB: {data.birthDate}</Text>}
            {data.location && <Text style={styles.headerMetaItem}>⌂ {data.location}</Text>}
            {data.github && <Text style={styles.headerMetaItem}>GitHub: {data.github}</Text>}
            {data.linkedin && <Text style={styles.headerMetaItem}>in {data.linkedin}</Text>}
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.leftCol}>
            {data.profileImage && (
              <View style={styles.profileWrap}>
                <Image style={styles.profileImage} src={data.profileImage} />
              </View>
            )}

            {/* About */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>{data.about}</Text>
            </View>

            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {data.skills.map((group) => (
                <View key={group.category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryName}>{group.category}</Text>
                  {group.items.map((skill) => (
                    <View key={skill} style={styles.skillItem}>
                      <View style={styles.skillDot} />
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu) => (
                  <View key={edu.degree} style={styles.eduItem}>
                    <Text style={styles.eduTitle}>{edu.degree}</Text>
                    <Text style={styles.eduSub}>{edu.school}</Text>
                    <Text style={styles.eduSub}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right column */}
          <View style={styles.rightCol}>
            {data.mainProject && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Main Project</Text>
                <View style={styles.projectItem}>
                  <Text style={styles.projectName}>{data.mainProject.name}</Text>
                  <Text style={styles.projectRole}>{data.mainProject.role}</Text>
                  <Text style={styles.projectDescription}>{data.mainProject.description}</Text>
                </View>
              </View>
            )}

            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {data.experience.map((exp, i) => (
                <View
                  key={i}
                  style={i === data.experience.length - 1 ? styles.expItemLast : styles.expItem}
                >
                  <View style={styles.expHeader}>
                    <Text style={styles.expTitle}>{exp.title}</Text>
                    <Text style={styles.expPeriod}>{exp.period}</Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDescription}>{exp.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
