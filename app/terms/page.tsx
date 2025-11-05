import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, Users, FileText, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - Cakranesia",
  description:
    "Terms of Service for Cakranesia - Platform komunitas pecinta kuliner Indonesia",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="text-muted-foreground mt-2">
                Last updated: December 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Quick Summary */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Quick Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• You must be at least 13 years old to use Cakranesia</p>
            <p>• You are responsible for the content you post</p>
            <p>• Respect other users and Indonesian culinary heritage</p>
            <p>
              • We reserve the right to moderate and remove inappropriate
              content
            </p>
            <p>
              • Your privacy is important - see our Privacy Policy for details
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome to{" "}
                <strong className="text-foreground">Cakranesia</strong>{" "}
                (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By
                accessing or using our platform at cakranesia.com (the
                &quot;Service&quot;), you agree to be bound by these Terms of
                Service (&quot;Terms&quot;). If you do not agree to these Terms,
                please do not use our Service.
              </p>
              <p>
                Cakranesia is a community platform dedicated to preserving and
                celebrating Indonesian culinary culture (&quot;Melestarikan Cita
                Rasa Indonesia&quot;). We provide a space for food enthusiasts
                to discover authentic recipes, share culinary stories, and
                explore the rich flavors of the Nusantara.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              2. User Accounts
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                2.1 Account Creation
              </h3>
              <p>
                To access certain features of the Service, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Provide accurate, current, and complete information during
                  registration
                </li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>
                  Be at least 13 years of age (or legal age in your
                  jurisdiction)
                </li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                2.2 Account Security
              </h3>
              <p>
                You are responsible for maintaining the security of your
                account. We use better-auth for authentication and implement
                industry-standard security measures. However, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Not share your account credentials with others</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use a strong, unique password</li>
                <li>Enable two-factor authentication when available</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                2.3 Account Termination
              </h3>
              <p>
                We reserve the right to suspend or terminate your account if you
                violate these Terms or engage in harmful behavior. You may also
                delete your account at any time through your account settings.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Content</h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                3.1 Content Ownership
              </h3>
              <p>
                You retain ownership of all content you post on Cakranesia,
                including recipes, blog posts, comments, photos, and other
                materials (&quot;User Content&quot;). By posting User Content,
                you grant us a worldwide, non-exclusive, royalty-free license to
                use, reproduce, modify, and display your content for the purpose
                of operating and promoting the Service.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                3.2 Content Guidelines
              </h3>
              <p>You agree that your User Content will:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be authentic and relate to Indonesian culinary culture</li>
                <li>Not infringe on intellectual property rights of others</li>
                <li>
                  Not contain offensive, hateful, or discriminatory language
                </li>
                <li>Not include spam, malware, or malicious links</li>
                <li>Not violate any applicable laws or regulations</li>
                <li>
                  Not misrepresent traditional recipes or cultural significance
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                3.3 Content Moderation
              </h3>
              <p>
                We reserve the right to review, moderate, edit, or remove any
                User Content that violates these Terms or is deemed
                inappropriate. We may also remove content that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Promotes dangerous food preparation practices</li>
                <li>Contains false or misleading information</li>
                <li>Disrespects cultural heritage or traditional practices</li>
                <li>Violates community standards or guidelines</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                3.4 Recipe Attribution
              </h3>
              <p>
                When sharing recipes, especially traditional or family recipes,
                we encourage you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide proper attribution to the original source</li>
                <li>
                  Credit family members or communities who shared the recipe
                </li>
                <li>Note regional variations and cultural context</li>
                <li>Respect the cultural significance of traditional dishes</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Community Features
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                4.1 Interactions
              </h3>
              <p>
                Cakranesia offers various community features including likes,
                saves, comments, and sharing. When interacting with other users:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be respectful and constructive in your comments</li>
                <li>Give credit when using others&apos; recipes or ideas</li>
                <li>Report inappropriate content or behavior</li>
                <li>
                  Engage in meaningful discussions about Indonesian cuisine
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                4.2 Prohibited Conduct
              </h3>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Harass, bully, or threaten other users</li>
                <li>
                  Create multiple accounts to manipulate voting or engagement
                </li>
                <li>
                  Scrape or collect data from the Service without permission
                </li>
                <li>Use automated bots or scripts without authorization</li>
                <li>Attempt to hack, disrupt, or compromise the Service</li>
                <li>Impersonate others or misrepresent your affiliation</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. AI Chatbot & Recommendations
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                5.1 AI Features
              </h3>
              <p>
                Cakranesia uses artificial intelligence to provide food
                recommendations and answer questions about Indonesian cuisine.
                While we strive for accuracy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  AI responses are generated based on available data and may not
                  always be accurate
                </li>
                <li>
                  Always verify recipes and cooking instructions from reliable
                  sources
                </li>
                <li>
                  Consult professionals for dietary restrictions or allergies
                </li>
                <li>
                  AI cannot replace cultural knowledge or traditional expertise
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                5.2 No Medical or Dietary Advice
              </h3>
              <p>
                Information provided through our AI chatbot or recommendations
                is for educational and entertainment purposes only. It should
                not be considered medical, dietary, or nutritional advice.
                Always consult qualified professionals for health-related
                concerns.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Search & Discovery
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our search functionality allows you to discover Indonesian
                dishes by province, ingredients, or name. We use PostgreSQL
                full-text search (or Meilisearch) to provide relevant results.
                However:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Search results depend on available data and may not be
                  comprehensive
                </li>
                <li>
                  Regional variations and names may differ across Indonesia
                </li>
                <li>
                  We continuously improve our database but cannot guarantee
                  completeness
                </li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Intellectual Property
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                7.1 Our Intellectual Property
              </h3>
              <p>
                The Cakranesia platform, including its design, logo, code, and
                original content, is protected by copyright and other
                intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copy or reproduce our platform design or code</li>
                <li>Use our branding without permission</li>
                <li>Create derivative works without authorization</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                7.2 Copyright Infringement
              </h3>
              <p>
                If you believe your copyright has been infringed, please contact
                us at id.cakranesia@gmail.com with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Description of the copyrighted work</li>
                <li>Location of the infringing content</li>
                <li>Your contact information</li>
                <li>Statement of good faith belief</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Privacy & Data</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your privacy is important to us. We collect and process personal
                data in accordance with our Privacy Policy. By using Cakranesia,
                you consent to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Collection of account information (name, email)</li>
                <li>Storage of your content and interactions</li>
                <li>Use of cookies and analytics (Google Analytics/Umami)</li>
                <li>Processing for service improvement and personalization</li>
              </ul>
              <p className="mt-4">
                For detailed information, please read our{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Disclaimers & Limitations
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">
                9.1 Service Availability
              </h3>
              <p>
                We strive to keep Cakranesia available 24/7, but we do not
                guarantee uninterrupted access. The Service may be temporarily
                unavailable for maintenance, updates, or technical issues.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                9.2 Content Accuracy
              </h3>
              <p>
                While we aim to preserve authentic Indonesian culinary
                knowledge, we cannot guarantee the accuracy or authenticity of
                all User Content. Recipes and information are provided &quot;as
                is&quot; without warranties.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">
                9.3 Limitation of Liability
              </h3>
              <p>
                To the maximum extent permitted by law, Cakranesia and its
                operators shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of data, profits, or opportunities</li>
                <li>
                  Food allergies, poisoning, or health issues from recipes
                </li>
                <li>Disputes between users</li>
                <li>Third-party content or links</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Changes to Terms
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update these Terms from time to time. When we make
                significant changes, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Update the &quot;Last updated&quot; date at the top</li>
                <li>Notify you via email or platform notification</li>
                <li>Give you opportunity to review changes</li>
              </ul>
              <p>
                Continued use of the Service after changes constitutes
                acceptance of the new Terms.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Either party may terminate this agreement:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">You:</strong> By closing
                  your account at any time
                </li>
                <li>
                  <strong className="text-foreground">Us:</strong> For violation
                  of these Terms, with or without notice
                </li>
              </ul>
              <p>Upon termination:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your access to the Service will be revoked</li>
                <li>
                  Your content may be retained or deleted per our Privacy Policy
                </li>
                <li>Some provisions of these Terms will survive termination</li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These Terms are governed by the laws of Indonesia. Any disputes
                arising from these Terms or your use of the Service shall be
                resolved in Indonesian courts.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-muted p-4 rounded-lg mt-4">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href="mailto:id.cakranesia@gmail.com"
                    className="text-primary hover:underline"
                  >
                    id.cakranesia@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Website:</strong>{" "}
                  cakranesia.com
                </p>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Acknowledgment */}
          <section className="mb-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  By using Cakranesia, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                  Thank you for helping us preserve and celebrate Indonesian
                  culinary heritage —{" "}
                  <strong className="text-foreground">
                    Melestarikan Cita Rasa Indonesia
                  </strong>
                  .
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12 flex-wrap">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
