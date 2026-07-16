const content = {
  es: {
    meta: { title: "Playbook de Desconexión Comercial | Cirion", description: "Playbook operativo del flujo de Desconexión Comercial solicitado por el cliente." },
    aria: { mainNav: "Navegación principal", sections: "Secciones del playbook", openNav: "Abrir navegación", language: "Idioma", summary: "Resumen del flujo", stages: "Etapas del flujo Comercial", roles: "Roles del proceso", systems: "Cadena de sistemas" },
    skip: "Saltar al contenido", brandProduct: "Desconexión Comercial", environment: "Guía operativa", breadcrumb: "Playbook operativo",
    nav: { home: "Inicio", flow: "Flujo E2E", decisions: "Decisiones", roles: "Roles", controls: "Controles", help: "Troubleshooting", glossary: "Glosario" },
    openSimulator: "Abrir simulador", sidebarNote: "Material de capacitación. Datos ficticios.", scopeBadge: "Solo flujo Comercial",
    sandbox: "Guía de capacitación. El simulador utiliza datos ficticios y no actualiza sistemas productivos.",
    hero: { eyebrow: "PLAYBOOK OPERATIVO · FLUJO COMERCIAL", title: "Desconexión Comercial, de punta a punta", lead: "Una guía para operar la solicitud iniciada por el cliente desde el Portal hasta el cierre controlado en Salesforce y la ejecución de OM en Siebel.", primary: "Recorrer el flujo", secondary: "Practicar en el simulador" },
    snapshot: { label: "ALCANCE DEL PROCESO", status: "Vigente", items: [["Origen", "Solicitud del cliente"], ["Gestión central", "Salesforce Case"], ["ETL operativo", "Financial Assurance"], ["Ejecución", "OM en Siebel"], ["Resultados", "Closed With / Without ETL"]] },
    flow: {
      title: "El recorrido operativo", intro: "Cada etapa tiene un responsable, una salida verificable y un siguiente paso. Salesforce centraliza la gestión; Siebel soporta la orden y su ejecución.",
      steps: [
        { system: "Portal", title: "Solicitud del cliente", body: "El cliente selecciona servicios elegibles, informa el motivo y envía la solicitud. El ETL visible es estimado.", owner: "Owner: Cliente" },
        { system: "Salesforce", title: "Case Comercial", body: "Se crea y asigna el Case. El AM gestiona contacto, actividades y la decisión del cliente.", owner: "Owner: Account Manager" },
        { system: "Salesforce", title: "Cálculo de ETL", body: "Financial Assurance completa la tarea y registra el monto operativo aplicable.", owner: "Owner: Financial Assurance" },
        { system: "Salesforce", title: "Decisión y excepción", body: "El cliente acepta el ETL o solicita una excepción con justificación y evidencia.", owner: "Owner: AM / Aprobadores" },
        { system: "Siebel", title: "Ejecución y cierre", body: "OM recibe el handoff controlado, ejecuta en Siebel y el Case expone el resultado final.", owner: "Owner: Order Management" }
      ],
      legends: [["Portal", "Captura la intención y muestra una estimación no vinculante."], ["Salesforce", "Centraliza actividades, decisiones, aprobaciones y trazabilidad."], ["Siebel", "Soporta la orden operativa y la ejecución de OM."]]
    },
    decisions: {
      title: "Una decisión, dos resultados controlados", intro: "Después del cálculo operativo de ETL, la respuesta del cliente determina la rama. Ningún cierre debe ocultar actividades pendientes.", or: "O",
      branches: [
        { label: "EL CLIENTE ACEPTA", title: "Continuar con ETL", steps: ["El AM registra la aceptación del cliente.", "Se conserva el monto operativo calculado por Financial Assurance.", "Se expone la actividad de facturación aplicable y el handoff a OM."], outcome: "Closed With ETL", note: "ETL aplicable" },
        { label: "EL CLIENTE SOLICITA EXCEPCIÓN", title: "Evaluar waiver de ETL", steps: ["El AM presenta justificación y metadatos de evidencia.", "La aprobación avanza secuencialmente: Director, VP y CEO según el umbral.", "Una aprobación final permite cerrar sin cargo; un rechazo termina la excepción."], outcome: "Closed Without ETL", note: "Waiver aprobado" }
      ]
    },
    roles: {
      title: "Ownership por etapa", intro: "El proceso avanza cuando cada equipo completa su responsabilidad y deja evidencia para el siguiente.", label: "RESPONSABILIDAD EN EL FLUJO",
      items: [
        { id: "am", tab: "Account Manager", title: "Account Manager", summary: "Conduce la gestión comercial y registra la decisión del cliente.", tasks: ["Completar las actividades de contacto requeridas en el Case.", "Comunicar el ETL operativo calculado por Financial Assurance.", "Registrar aceptación, solicitud de excepción, retención o decisión pendiente según el escenario.", "Documentar campos obligatorios y dejar trazabilidad antes de avanzar."] },
        { id: "fa", tab: "Financial Assurance", title: "Financial Assurance", summary: "Determina el monto operativo de ETL y sostiene su trazabilidad financiera.", tasks: ["Revisar la información contractual y completar el cálculo operativo.", "Registrar el monto de ETL en la tarea correspondiente.", "Gestionar recálculos cuando exista información que lo justifique.", "Mantener evidencia y comentarios accesibles para la decisión comercial."] },
        { id: "approvers", tab: "Aprobadores", title: "Director · VP · CEO", summary: "Evalúan las excepciones de ETL en una secuencia definida por el umbral.", tasks: ["Revisar impacto financiero, justificación y evidencia.", "Aprobar o rechazar sin saltear el nivel actual.", "Dejar la decisión y sus comentarios en el registro.", "Detener la ruta cuando un nivel rechaza la excepción."] },
        { id: "csm", tab: "CSM", title: "Customer Success Manager", summary: "Aporta clasificación y contexto dentro del flujo Comercial, sin sustituir al owner del Case.", tasks: ["Clasificar la causa raíz cuando el estado del proceso lo habilite.", "Completar categorías y submotivos aplicables.", "Aportar contexto del cliente cuando sea requerido.", "Usar siempre la sigla CSM en registros y comunicaciones."] },
        { id: "om", tab: "Order Management", title: "Order Management", summary: "Ejecuta el handoff operativo en Siebel y confirma el resultado.", tasks: ["Revisar que el Case y la orden estén habilitados para ejecución.", "Respetar la fecha efectiva informada.", "Ejecutar la orden en Siebel.", "Confirmar la ejecución y exponer cualquier actividad remanente."] }
      ]
    },
    controls: {
      title: "Controles que no se negocian", intro: "Use esta lista antes de mover el Case, aprobar una excepción o confirmar el cierre.", calloutLabel: "REGLA DE ORO", callout: "El valor mostrado en el Portal es una estimación no vinculante. Financial Assurance calcula el ETL operativo.",
      items: [["Origen confirmado", "La desconexión fue solicitada por el cliente."], ["ETL correctamente identificado", "Portal = estimación; Financial Assurance = monto operativo."], ["Decisión documentada", "La respuesta del cliente y los campos requeridos están registrados."], ["Excepción respaldada", "La solicitud incluye justificación, evidencia y ruta de aprobación."], ["Handoff verificable", "La ejecución de OM referencia Siebel y la fecha efectiva."], ["Cierre transparente", "El resultado financiero es visible y no existen actividades ocultas."]]
    },
    help: {
      title: "Cuando el flujo se detiene", intro: "Identifique el síntoma, valide la evidencia y devuelva la acción al owner correcto.", validate: "Validar", action: "Acción",
      items: [
        { q: "El ETL operativo todavía no está disponible", validate: "Revise la tarea de Financial Assurance, los datos contractuales y el estado del cálculo.", action: "Mantenga pendiente la decisión del cliente hasta contar con el monto operativo." },
        { q: "El AM no puede registrar la decisión", validate: "Compruebe actividades de contacto, campos obligatorios y dependencias del estado actual.", action: "Complete la evidencia faltante; no fuerce el avance del Case." },
        { q: "La excepción no avanza", validate: "Confirme justificación, metadatos de evidencia, impacto financiero y aprobador actual.", action: "Devuelva la acción al nivel pendiente. La ruta es secuencial y no admite saltos." },
        { q: "OM no puede ejecutar la orden", validate: "Compare el estado del Case, la fecha efectiva y el estado habilitante de la orden en Siebel.", action: "Corrija la inconsistencia antes de ejecutar y documente el resultado." },
        { q: "El Case parece cerrado pero quedan actividades", validate: "Revise Feed, Related, tareas de facturación, aprobación e historial de OM.", action: "No considere finalizado el escenario hasta exponer y resolver cada actividad abierta." }
      ]
    },
    glossary: {
      title: "Lenguaje común", intro: "Definiciones breves para mantener consistencia entre equipos y sistemas.",
      items: [["ETL estimado", "Valor preventivo y no vinculante mostrado en el Portal."], ["ETL operativo", "Monto calculado por Financial Assurance y utilizado para la decisión."], ["Case Comercial", "Registro de Salesforce que centraliza la solicitud, actividades y decisiones."], ["ETL Exception", "Solicitud documentada para exceptuar el cargo de ETL."], ["Closed With ETL", "Cierre con ETL aplicable y actividad de facturación cuando corresponda."], ["Closed Without ETL", "Cierre con waiver aprobado y sin actividad de facturación abierta."], ["Handoff a OM", "Transferencia controlada para la ejecución operativa en Siebel."], ["Billing Effective Ending Date", "Fecha efectiva que debe respetarse durante la ejecución."], ["CSM", "Customer Success Manager. Es la única sigla válida en este proceso."]]
    },
    closing: { kicker: "LISTO PARA PRACTICAR", title: "Complete el recorrido en el entorno de capacitación", body: "Pruebe la aceptación de ETL y la ruta de excepción con datos completamente ficticios." },
    footer: "Desconexión Comercial · Playbook de capacitación"
  },
  pt: {
    meta: { title: "Playbook de Desconexão Comercial | Cirion", description: "Playbook operacional do fluxo de Desconexão Comercial solicitado pelo cliente." },
    aria: { mainNav: "Navegação principal", sections: "Seções do playbook", openNav: "Abrir navegação", language: "Idioma", summary: "Resumo do fluxo", stages: "Etapas do fluxo Comercial", roles: "Papéis do processo", systems: "Cadeia de sistemas" },
    skip: "Ir para o conteúdo", brandProduct: "Desconexão Comercial", environment: "Guia operacional", breadcrumb: "Playbook operacional",
    nav: { home: "Início", flow: "Fluxo E2E", decisions: "Decisões", roles: "Papéis", controls: "Controles", help: "Solução de problemas", glossary: "Glossário" },
    openSimulator: "Abrir simulador", sidebarNote: "Material de treinamento. Dados fictícios.", scopeBadge: "Somente fluxo Comercial",
    sandbox: "Guia de treinamento. O simulador utiliza dados fictícios e não atualiza sistemas produtivos.",
    hero: { eyebrow: "PLAYBOOK OPERACIONAL · FLUXO COMERCIAL", title: "Desconexão Comercial, de ponta a ponta", lead: "Um guia para operar a solicitação iniciada pelo cliente, desde o Portal até o encerramento controlado no Salesforce e a execução de OM no Siebel.", primary: "Percorrer o fluxo", secondary: "Praticar no simulador" },
    snapshot: { label: "ESCOPO DO PROCESSO", status: "Vigente", items: [["Origem", "Solicitação do cliente"], ["Gestão central", "Case no Salesforce"], ["ETL operacional", "Financial Assurance"], ["Execução", "OM no Siebel"], ["Resultados", "Closed With / Without ETL"]] },
    flow: {
      title: "O percurso operacional", intro: "Cada etapa tem um responsável, uma saída verificável e um próximo passo. O Salesforce centraliza a gestão; o Siebel suporta a ordem e sua execução.",
      steps: [
        { system: "Portal", title: "Solicitação do cliente", body: "O cliente seleciona os serviços elegíveis, informa o motivo e envia a solicitação. O ETL exibido é estimado.", owner: "Owner: Cliente" },
        { system: "Salesforce", title: "Case Comercial", body: "O Case é criado e atribuído. O AM gerencia o contato, as atividades e a decisão do cliente.", owner: "Owner: Account Manager" },
        { system: "Salesforce", title: "Cálculo de ETL", body: "Financial Assurance conclui a tarefa e registra o valor operacional aplicável.", owner: "Owner: Financial Assurance" },
        { system: "Salesforce", title: "Decisão e exceção", body: "O cliente aceita o ETL ou solicita uma exceção com justificativa e evidência.", owner: "Owner: AM / Aprovadores" },
        { system: "Siebel", title: "Execução e encerramento", body: "OM recebe o handoff controlado, executa no Siebel e o Case apresenta o resultado final.", owner: "Owner: Order Management" }
      ],
      legends: [["Portal", "Captura a intenção e apresenta uma estimativa não vinculante."], ["Salesforce", "Centraliza atividades, decisões, aprovações e rastreabilidade."], ["Siebel", "Suporta a ordem operacional e a execução de OM."]]
    },
    decisions: {
      title: "Uma decisão, dois resultados controlados", intro: "Após o cálculo operacional de ETL, a resposta do cliente determina o caminho. Nenhum encerramento deve ocultar atividades pendentes.", or: "OU",
      branches: [
        { label: "O CLIENTE ACEITA", title: "Prosseguir com ETL", steps: ["O AM registra a aceitação do cliente.", "O valor operacional calculado por Financial Assurance é mantido.", "A atividade de faturamento aplicável e o handoff para OM ficam visíveis."], outcome: "Closed With ETL", note: "ETL aplicável" },
        { label: "O CLIENTE SOLICITA EXCEÇÃO", title: "Avaliar waiver de ETL", steps: ["O AM apresenta justificativa e metadados de evidência.", "A aprovação avança sequencialmente: Diretor, VP e CEO, conforme o limite.", "A aprovação final permite encerrar sem cobrança; uma rejeição encerra a exceção."], outcome: "Closed Without ETL", note: "Waiver aprovado" }
      ]
    },
    roles: {
      title: "Ownership por etapa", intro: "O processo avança quando cada equipe conclui sua responsabilidade e deixa evidências para a próxima.", label: "RESPONSABILIDADE NO FLUXO",
      items: [
        { id: "am", tab: "Account Manager", title: "Account Manager", summary: "Conduz a gestão comercial e registra a decisão do cliente.", tasks: ["Concluir as atividades de contato exigidas no Case.", "Comunicar o ETL operacional calculado por Financial Assurance.", "Registrar aceitação, solicitação de exceção, retenção ou decisão pendente conforme o cenário.", "Documentar os campos obrigatórios e deixar rastreabilidade antes de avançar."] },
        { id: "fa", tab: "Financial Assurance", title: "Financial Assurance", summary: "Determina o valor operacional de ETL e mantém sua rastreabilidade financeira.", tasks: ["Revisar as informações contratuais e concluir o cálculo operacional.", "Registrar o valor de ETL na tarefa correspondente.", "Gerenciar recálculos quando houver informações que os justifiquem.", "Manter evidências e comentários acessíveis para a decisão comercial."] },
        { id: "approvers", tab: "Aprovadores", title: "Diretor · VP · CEO", summary: "Avaliam as exceções de ETL em uma sequência definida pelo limite.", tasks: ["Revisar impacto financeiro, justificativa e evidência.", "Aprovar ou rejeitar sem pular o nível atual.", "Registrar a decisão e seus comentários.", "Interromper a rota quando um nível rejeitar a exceção."] },
        { id: "csm", tab: "CSM", title: "Customer Success Manager", summary: "Contribui com classificação e contexto no fluxo Comercial, sem substituir o owner do Case.", tasks: ["Classificar a causa raiz quando o estado do processo permitir.", "Preencher as categorias e os submotivos aplicáveis.", "Fornecer contexto do cliente quando necessário.", "Usar sempre a sigla CSM nos registros e comunicações."] },
        { id: "om", tab: "Order Management", title: "Order Management", summary: "Executa o handoff operacional no Siebel e confirma o resultado.", tasks: ["Verificar se o Case e a ordem estão habilitados para execução.", "Respeitar a data efetiva informada.", "Executar a ordem no Siebel.", "Confirmar a execução e apresentar qualquer atividade remanescente."] }
      ]
    },
    controls: {
      title: "Controles inegociáveis", intro: "Use esta lista antes de mover o Case, aprovar uma exceção ou confirmar o encerramento.", calloutLabel: "REGRA DE OURO", callout: "O valor exibido no Portal é uma estimativa não vinculante. Financial Assurance calcula o ETL operacional.",
      items: [["Origem confirmada", "A desconexão foi solicitada pelo cliente."], ["ETL identificado corretamente", "Portal = estimativa; Financial Assurance = valor operacional."], ["Decisão documentada", "A resposta do cliente e os campos obrigatórios estão registrados."], ["Exceção respaldada", "A solicitação inclui justificativa, evidência e rota de aprovação."], ["Handoff verificável", "A execução de OM referencia o Siebel e a data efetiva."], ["Encerramento transparente", "O resultado financeiro está visível e não existem atividades ocultas."]]
    },
    help: {
      title: "Quando o fluxo para", intro: "Identifique o sintoma, valide a evidência e devolva a ação ao owner correto.", validate: "Validar", action: "Ação",
      items: [
        { q: "O ETL operacional ainda não está disponível", validate: "Revise a tarefa de Financial Assurance, os dados contratuais e o status do cálculo.", action: "Mantenha a decisão do cliente pendente até que o valor operacional esteja disponível." },
        { q: "O AM não consegue registrar a decisão", validate: "Verifique as atividades de contato, os campos obrigatórios e as dependências do status atual.", action: "Complete as evidências ausentes; não force o avanço do Case." },
        { q: "A exceção não avança", validate: "Confirme a justificativa, os metadados de evidência, o impacto financeiro e o aprovador atual.", action: "Devolva a ação ao nível pendente. A rota é sequencial e não permite saltos." },
        { q: "OM não consegue executar a ordem", validate: "Compare o status do Case, a data efetiva e o status habilitante da ordem no Siebel.", action: "Corrija a inconsistência antes da execução e documente o resultado." },
        { q: "O Case parece encerrado, mas ainda há atividades", validate: "Revise Feed, Related, tarefas de faturamento, aprovação e histórico de OM.", action: "Não considere o cenário concluído até apresentar e resolver cada atividade aberta." }
      ]
    },
    glossary: {
      title: "Linguagem comum", intro: "Definições breves para manter a consistência entre equipes e sistemas.",
      items: [["ETL estimado", "Valor preventivo e não vinculante exibido no Portal."], ["ETL operacional", "Valor calculado por Financial Assurance e utilizado na decisão."], ["Case Comercial", "Registro do Salesforce que centraliza a solicitação, as atividades e as decisões."], ["ETL Exception", "Solicitação documentada para isentar a cobrança de ETL."], ["Closed With ETL", "Encerramento com ETL aplicável e atividade de faturamento quando necessário."], ["Closed Without ETL", "Encerramento com waiver aprovado e sem atividade de faturamento aberta."], ["Handoff para OM", "Transferência controlada para a execução operacional no Siebel."], ["Billing Effective Ending Date", "Data efetiva que deve ser respeitada durante a execução."], ["CSM", "Customer Success Manager. É a única sigla válida neste processo."]]
    },
    closing: { kicker: "PRONTO PARA PRATICAR", title: "Complete o percurso no ambiente de treinamento", body: "Teste a aceitação de ETL e a rota de exceção com dados totalmente fictícios." },
    footer: "Desconexão Comercial · Playbook de treinamento"
  },
  en: {
    meta: { title: "Commercial Disconnection Playbook | Cirion", description: "Operational playbook for the customer-requested Commercial Disconnection flow." },
    aria: { mainNav: "Main navigation", sections: "Playbook sections", openNav: "Open navigation", language: "Language", summary: "Flow summary", stages: "Commercial flow stages", roles: "Process roles", systems: "System chain" },
    skip: "Skip to content", brandProduct: "Commercial Disconnection", environment: "Operational guide", breadcrumb: "Operational playbook",
    nav: { home: "Home", flow: "E2E flow", decisions: "Decisions", roles: "Roles", controls: "Controls", help: "Troubleshooting", glossary: "Glossary" },
    openSimulator: "Open simulator", sidebarNote: "Training material. Fictional data.", scopeBadge: "Commercial flow only",
    sandbox: "Training guide. The simulator uses fictional data and does not update production systems.",
    hero: { eyebrow: "OPERATIONAL PLAYBOOK · COMMERCIAL FLOW", title: "Commercial Disconnection, end to end", lead: "A guide to operate the customer-initiated request from the Portal through controlled closure in Salesforce and OM execution in Siebel.", primary: "Walk through the flow", secondary: "Practice in the simulator" },
    snapshot: { label: "PROCESS SCOPE", status: "Current", items: [["Origin", "Customer request"], ["Central management", "Salesforce Case"], ["Operative ETL", "Financial Assurance"], ["Execution", "OM in Siebel"], ["Outcomes", "Closed With / Without ETL"]] },
    flow: {
      title: "The operational journey", intro: "Every stage has an owner, a verifiable output, and a next step. Salesforce centralizes case management; Siebel supports the order and its execution.",
      steps: [
        { system: "Portal", title: "Customer request", body: "The customer selects eligible services, provides the reason, and submits the request. The displayed ETL is an estimate.", owner: "Owner: Customer" },
        { system: "Salesforce", title: "Commercial Case", body: "The Case is created and assigned. The AM manages contact, activities, and the customer decision.", owner: "Owner: Account Manager" },
        { system: "Salesforce", title: "ETL calculation", body: "Financial Assurance completes the task and records the applicable operative amount.", owner: "Owner: Financial Assurance" },
        { system: "Salesforce", title: "Decision and exception", body: "The customer accepts ETL or requests an exception with justification and evidence.", owner: "Owner: AM / Approvers" },
        { system: "Siebel", title: "Execution and closure", body: "OM receives the controlled handoff, executes in Siebel, and the Case exposes the final outcome.", owner: "Owner: Order Management" }
      ],
      legends: [["Portal", "Captures intent and displays a non-binding estimate."], ["Salesforce", "Centralizes activities, decisions, approvals, and traceability."], ["Siebel", "Supports the operational order and OM execution."]]
    },
    decisions: {
      title: "One decision, two controlled outcomes", intro: "After operative ETL is calculated, the customer response determines the branch. No closure may conceal pending activities.", or: "OR",
      branches: [
        { label: "THE CUSTOMER ACCEPTS", title: "Proceed with ETL", steps: ["The AM records the customer's acceptance.", "The operative amount calculated by Financial Assurance remains applicable.", "The applicable billing activity and OM handoff are exposed."], outcome: "Closed With ETL", note: "ETL applies" },
        { label: "THE CUSTOMER REQUESTS AN EXCEPTION", title: "Assess an ETL waiver", steps: ["The AM submits justification and evidence metadata.", "Approval advances sequentially through Director, VP, and CEO according to the threshold.", "Final approval enables closure without the charge; a rejection ends the exception route."], outcome: "Closed Without ETL", note: "Waiver approved" }
      ]
    },
    roles: {
      title: "Ownership by stage", intro: "The process advances when every team completes its responsibility and leaves evidence for the next one.", label: "RESPONSIBILITY IN THE FLOW",
      items: [
        { id: "am", tab: "Account Manager", title: "Account Manager", summary: "Leads commercial management and records the customer decision.", tasks: ["Complete the required customer-contact activities in the Case.", "Communicate the operative ETL calculated by Financial Assurance.", "Record acceptance, exception request, retention, or a pending decision as supported by the scenario.", "Complete required fields and leave traceability before advancing."] },
        { id: "fa", tab: "Financial Assurance", title: "Financial Assurance", summary: "Determines the operative ETL amount and maintains its financial traceability.", tasks: ["Review contractual information and complete the operative calculation.", "Record the ETL amount in the corresponding task.", "Manage recalculations when supported by new information.", "Keep evidence and comments accessible for the commercial decision."] },
        { id: "approvers", tab: "Approvers", title: "Director · VP · CEO", summary: "Assess ETL exceptions in a sequence determined by the amount threshold.", tasks: ["Review financial impact, justification, and evidence.", "Approve or reject without bypassing the current level.", "Record the decision and supporting comments.", "Stop the route when any level rejects the exception."] },
        { id: "csm", tab: "CSM", title: "Customer Success Manager", summary: "Provides classification and context within the Commercial flow without replacing the Case owner.", tasks: ["Classify root cause when enabled by the process state.", "Complete applicable categories and sub-reasons.", "Provide customer context when required.", "Always use the CSM acronym in records and communications."] },
        { id: "om", tab: "Order Management", title: "Order Management", summary: "Executes the operational handoff in Siebel and confirms the outcome.", tasks: ["Verify that the Case and order are enabled for execution.", "Respect the stated effective date.", "Execute the order in Siebel.", "Confirm execution and expose any remaining activities."] }
      ]
    },
    controls: {
      title: "Non-negotiable controls", intro: "Use this list before moving the Case, approving an exception, or confirming closure.", calloutLabel: "GOLDEN RULE", callout: "The value displayed in the Portal is a non-binding estimate. Financial Assurance calculates operative ETL.",
      items: [["Origin confirmed", "The disconnection was requested by the customer."], ["ETL correctly identified", "Portal = estimate; Financial Assurance = operative amount."], ["Decision documented", "The customer response and required fields are recorded."], ["Exception supported", "The request includes justification, evidence, and an approval route."], ["Handoff verifiable", "OM execution references Siebel and the effective date."], ["Closure transparent", "The financial outcome is visible and no hidden activities remain."]]
    },
    help: {
      title: "When the flow stops", intro: "Identify the symptom, validate the evidence, and return the action to the correct owner.", validate: "Validate", action: "Action",
      items: [
        { q: "Operative ETL is not available yet", validate: "Review the Financial Assurance task, contractual data, and calculation status.", action: "Keep the customer decision pending until the operative amount is available." },
        { q: "The AM cannot record the decision", validate: "Check customer-contact activities, required fields, and current-state dependencies.", action: "Complete the missing evidence; do not force the Case forward." },
        { q: "The exception is not advancing", validate: "Confirm justification, evidence metadata, financial impact, and the current approver.", action: "Return the action to the pending level. The route is sequential and cannot be bypassed." },
        { q: "OM cannot execute the order", validate: "Compare the Case status, effective date, and enabling order status in Siebel.", action: "Correct the inconsistency before execution and document the outcome." },
        { q: "The Case appears closed but activities remain", validate: "Review Feed, Related, billing tasks, approval records, and OM history.", action: "Do not consider the scenario complete until every open activity is exposed and resolved." }
      ]
    },
    glossary: {
      title: "Shared language", intro: "Short definitions that keep teams and systems consistent.",
      items: [["Estimated ETL", "A preventive, non-binding value displayed in the Portal."], ["Operative ETL", "The amount calculated by Financial Assurance and used for the decision."], ["Commercial Case", "The Salesforce record that centralizes the request, activities, and decisions."], ["ETL Exception", "A documented request to waive the ETL charge."], ["Closed With ETL", "Closure with applicable ETL and a billing activity when required."], ["Closed Without ETL", "Closure with an approved waiver and no open billing activity."], ["OM handoff", "The controlled transfer for operational execution in Siebel."], ["Billing Effective Ending Date", "The effective date that must be observed during execution."], ["CSM", "Customer Success Manager. This is the only valid acronym in this process."]]
    },
    closing: { kicker: "READY TO PRACTICE", title: "Complete the journey in the training environment", body: "Test ETL acceptance and the exception route using entirely fictional data." },
    footer: "Commercial Disconnection · Training playbook"
  }
};

let language = "es";
let activeRole = "am";

function valueAt(path) {
  return path.split(".").reduce((value, key) => value?.[key], content[language]);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character]));
}

function renderStaticText() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const translated = valueAt(element.dataset.i18n);
    if (typeof translated === "string") element.textContent = translated;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    const translated = valueAt(element.dataset.i18nAria);
    if (typeof translated === "string") element.setAttribute("aria-label", translated);
  });
  document.documentElement.lang = language;
  document.title = content[language].meta.title;
  document.querySelector('meta[name="description"]').content = content[language].meta.description;
  document.querySelectorAll("[data-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
}

function renderSnapshot() {
  document.getElementById("snapshotList").innerHTML = content[language].snapshot.items.map(([term, description]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(description)}</dd></div>`).join("");
}

function renderJourney() {
  document.getElementById("journey").innerHTML = content[language].flow.steps.map((step, index) => `
    <article class="journey-step">
      <div class="step-top"><span class="step-number">0${index + 1}</span><span class="step-system">${escapeHtml(step.system)}</span></div>
      <h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p><span class="step-owner">${escapeHtml(step.owner)}</span>
    </article>`).join("");
  document.getElementById("flowLegend").innerHTML = content[language].flow.legends.map(([system, description]) => `<div class="legend-item"><strong>${escapeHtml(system)}</strong>${escapeHtml(description)}</div>`).join("");
}

function renderDecisions() {
  const branches = content[language].decisions.branches.map(branch => `
    <article class="decision-branch">
      <header class="branch-head"><small>${escapeHtml(branch.label)}</small><h3>${escapeHtml(branch.title)}</h3></header>
      <ol class="branch-steps">${branch.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <div class="branch-outcome"><span>${escapeHtml(branch.outcome)}</span><span>${escapeHtml(branch.note)}</span></div>
    </article>`);
  document.getElementById("decisionMap").innerHTML = `${branches[0]}<div class="decision-or">${escapeHtml(content[language].decisions.or)}</div>${branches[1]}`;
}

function renderRoles() {
  const roles = content[language].roles.items;
  if (!roles.some(role => role.id === activeRole)) activeRole = roles[0].id;
  document.getElementById("roleTabs").innerHTML = roles.map(role => `<button type="button" role="tab" id="tab-${role.id}" aria-controls="rolePanel" aria-selected="${role.id === activeRole}" data-role="${role.id}">${escapeHtml(role.tab)}</button>`).join("");
  const role = roles.find(item => item.id === activeRole);
  const panel = document.getElementById("rolePanel");
  panel.setAttribute("aria-labelledby", `tab-${role.id}`);
  panel.innerHTML = `<div class="role-identity"><small>${escapeHtml(content[language].roles.label)}</small><h3>${escapeHtml(role.title)}</h3><p>${escapeHtml(role.summary)}</p></div><div class="role-responsibilities">${role.tasks.map((task, index) => `<div class="role-task"><span>${index + 1}</span><p>${escapeHtml(task)}</p></div>`).join("")}</div>`;
  document.querySelectorAll("[data-role]").forEach(button => button.addEventListener("click", () => { activeRole = button.dataset.role; renderRoles(); }));
}

function renderControls() {
  document.getElementById("controlList").innerHTML = content[language].controls.items.map(([title, description]) => `<div class="control-item"><span class="control-check" aria-hidden="true">✓</span><div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(description)}</p></div></div>`).join("");
}

function renderHelp() {
  document.getElementById("troubleshooting").innerHTML = content[language].help.items.map((item, index) => `
    <article class="trouble-item">
      <button class="trouble-question" type="button" aria-expanded="false" aria-controls="answer-${index}"><span>0${index + 1}</span><strong>${escapeHtml(item.q)}</strong><i aria-hidden="true">+</i></button>
      <div class="trouble-answer-wrap" id="answer-${index}"><div class="trouble-answer"><div class="trouble-answer-inner"><div><strong>${escapeHtml(content[language].help.validate)}</strong><p>${escapeHtml(item.validate)}</p></div><div><strong>${escapeHtml(content[language].help.action)}</strong><p>${escapeHtml(item.action)}</p></div></div></div></div>
    </article>`).join("");
  document.querySelectorAll(".trouble-question").forEach(button => button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    document.getElementById(button.getAttribute("aria-controls")).classList.toggle("open", !expanded);
  }));
}

function renderGlossary() {
  document.getElementById("glossaryList").innerHTML = content[language].glossary.items.map(([term, definition]) => `<dl class="term"><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(definition)}</dd></dl>`).join("");
}

function updateCurrentSection(section) {
  document.querySelectorAll("[data-section]").forEach(link => link.classList.toggle("active", link.dataset.section === section.id));
  document.getElementById("currentSection").textContent = valueAt(section.dataset.titleKey);
}

function renderAll() {
  renderStaticText(); renderSnapshot(); renderJourney(); renderDecisions(); renderRoles(); renderControls(); renderHelp(); renderGlossary();
  const activeSection = document.querySelector(".section:target") || document.querySelector(".section");
  updateCurrentSection(activeSection);
}

function chooseInitialLanguage() {
  const urlLanguage = new URL(location.href).searchParams.get("lang");
  const storedLanguage = localStorage.getItem("cirion-playbook-language");
  const browserLanguage = navigator.language?.slice(0, 2);
  return [urlLanguage, storedLanguage, browserLanguage, "es"].find(candidate => Object.hasOwn(content, candidate));
}

function setLanguage(nextLanguage) {
  if (!Object.hasOwn(content, nextLanguage)) return;
  language = nextLanguage;
  localStorage.setItem("cirion-playbook-language", language);
  const url = new URL(location.href);
  url.searchParams.set("lang", language);
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  renderAll();
}

document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const sidebarScrim = document.getElementById("sidebarScrim");
function setMenu(open) {
  sidebar.classList.toggle("open", open);
  sidebarScrim.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
}
menuButton.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
sidebarScrim.addEventListener("click", () => setMenu(false));
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) updateCurrentSection(visible.target);
}, { rootMargin: "-20% 0px -65%", threshold: [0, .1, .5] });
document.querySelectorAll(".section").forEach(section => observer.observe(section));

language = chooseInitialLanguage();
renderAll();
